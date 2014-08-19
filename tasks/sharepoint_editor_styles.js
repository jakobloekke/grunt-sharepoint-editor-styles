/*
 * grunt-sharepoint-editor-styles
 *
 *
 * Copyright (c) 2014 Jakob Løkke Madsen
 * Licensed under the MIT license.
 */

'use strict';

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
            console.log(src);




            /*
            // Concat specified files.
            var src = file.src.filter(function (filepath) {
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
            }).join(grunt.util.normalizelf(options.separator));

            // Handle options.
            src += options.punctuation;

            // Write the destination file.
            grunt.file.write(file.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + file.dest + '" created.');

            */
        });
    });

};
