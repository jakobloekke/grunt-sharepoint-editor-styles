/*
 * grunt-sharepoint-editor-styles
 *
 *
 * Copyright (c) 2014 Jakob Løkke Madsen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    sharepoint_editor_styles: {
      one_file: {
        files: {
          'tmp/one_file.css': ['test/fixtures/test.css']
        }
      },
      multiple_files: {
        files: {
          'tmp/multiple_files.css': ['test/fixtures/test.css', 'test/fixtures/test2.css']
        }
      },
      prependCss: {
        options: {
          CssFileToPrepend: 'test/fixtures/prepend.css'
        },
        files: {
          'tmp/prependCss.css': ['test/fixtures/test.css', 'test/fixtures/test2.css']
        }
      },
      pseudoSelectors: {
        options: {
          CssFileToPrepend: 'test/fixtures/prepend.css'
        },
        files: {
          'tmp/pseudoSelectors.css': ['test/fixtures/test.css', 'test/fixtures/test2.css', 'test/fixtures/pseudo.css']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  })
  ;

// Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

// Whenever the "test" task is run, first clean the "tmp" dir, then run this
// plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sharepoint_editor_styles', 'nodeunit']);

// By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerTask('travis', ['jshint', 'test']);

}
;
