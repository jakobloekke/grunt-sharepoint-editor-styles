/*
 * grunt-sharepoint-editor-styles
 *
 *
 * Copyright (c) 2014 Jakob Løkke Madsen
 * Licensed under the MIT license.
 */

'use strict';

var css = require('css'),
    _ = require('underscore');

module.exports = function (grunt) {

  function findRelevantPseudoSelectorRules(rules_with_ms_name, parsed_css) {
    var relevant_rules = [];

    // For each ms_rule
    _.each(rules_with_ms_name, function (ms_rule) {

      // Find the ms_rule.selector (always the first selector)
      var ms_rule_selector = ms_rule.selectors[0] + ':';

      // Locate the ms_rule_selector in the general rules
      _.each(parsed_css.stylesheet.rules, function (rule) {
        var matching_selector = _.find(rule.selectors, function (selector) {
          return selector.indexOf(ms_rule_selector) !== -1;
        });

        // when found, append the corresponding general rule to relevant rules
        if (matching_selector) {
          relevant_rules.push(rule);
        }
      });
    });

    return relevant_rules;
  }

  grunt.registerMultiTask('sharepoint_editor_styles', 'Extract sharepoint editor styles into separate stylesheet.', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      CssFileToPrepend: null
    });

    // Iterate over all specified file groups.
    this.files.forEach(function (input_file) {
      var generated_editor_stylesheet_content = '';

      // Get file to prepend
      if (options.CssFileToPrepend && grunt.file.exists(options.CssFileToPrepend)) {
        generated_editor_stylesheet_content = grunt.file.read(options.CssFileToPrepend);
      } else {
        generated_editor_stylesheet_content = '';
      }

      var src = input_file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      });

      _.each(src, function (css_file_content, i) {
        var parsed_css = css.parse(css_file_content);
        var rules_with_ms_name = [];

        _.each(parsed_css.stylesheet.rules, function (rule) {
          _.each(rule.declarations, function (declaration) {
            if (declaration.property === '-ms-name') {
              rules_with_ms_name.push(rule);
            }
          });
        });

        var relevant_pseudo_selector_rules = findRelevantPseudoSelectorRules(rules_with_ms_name, parsed_css);
        parsed_css.stylesheet.rules = rules_with_ms_name.concat(relevant_pseudo_selector_rules);
        generated_editor_stylesheet_content += css.stringify(parsed_css) + '\n';

      });

      grunt.file.write(input_file.dest, generated_editor_stylesheet_content);
    });
  });
};
