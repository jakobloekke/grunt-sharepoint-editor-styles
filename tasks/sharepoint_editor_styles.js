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

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('sharepoint_editor_styles', 'Extract sharepoint editor styles into separate stylesheet.', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            generated_file_destination: 'tmp',
            generated_file_name: 'EditorStyles.css'
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (input_file) {

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

            // Write the destination file.
            grunt.file.write(input_file.dest, src);

            // Write the generated file
            var parsed_css = css.parse(src.toString());
            var rules_with_ms_name = [];

            _.each(parsed_css.stylesheet.rules, function (rule) {
                _.each(rule.declarations, function (declaration) {
                    if (declaration.property === '-ms-name') {
                        rules_with_ms_name.push(rule);
                    }
                });
            });

            parsed_css.stylesheet.rules = rules_with_ms_name;

            var generated_editor_stylesheet = css.stringify(parsed_css);

            grunt.file.write(input_file.dest, generated_editor_stylesheet + '\n');
        });
    });
};
