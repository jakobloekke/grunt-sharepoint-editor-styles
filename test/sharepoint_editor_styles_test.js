'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.sharepoint_editor_styles = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  one_file: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/one_file.css');
    var expected = grunt.file.read('test/expected/one_file.css');
    test.equal(actual, expected, 'should only contain rules for the SP editor.');

    test.done();
  },
  multiple_files: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/multiple_files.css');
    var expected = grunt.file.read('test/expected/multiple_files.css');
    test.equal(actual, expected, 'should work with multiple files.');

    test.done();
  },
  prependCss: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/prependCss.css');
    var expected = grunt.file.read('test/expected/prependCss.css');
    test.equal(actual, expected, 'should have an option to prepend a pure CSS file.');

    test.done();
  },
  pseudoSelectors: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/pseudoSelectors.css');
    var expected = grunt.file.read('test/expected/pseudoSelectors.css');
    test.equal(actual, expected, 'should find all pseudoselectors for editor styles and include those too.');

    test.done();
  }
};
