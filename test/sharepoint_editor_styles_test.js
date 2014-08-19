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
    normal_styles: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/test.css');
        var expected = grunt.file.read('test/fixtures/test.css');
        test.equal(actual, expected, 'should be an exact copy of the original stylesheet.');

        test.done();
    },
    editor_styles: function (test) {
        test.expect(1);

        var actual = grunt.file.read('test/fixtures/test.css');
        var expected = grunt.file.read('test/expected/editor-styles.css');
        test.equal(actual, expected, 'should only contain rules for the SP editor.');

        test.done();
    }
};
