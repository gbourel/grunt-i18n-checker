'use strict';

var path =  require('path'),
  exec =    require('child_process').exec;

var execOptions = {
    cwd: path.join(__dirname, '..')
  };

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

exports.i18nChecker = {
  simple: function(test) {
    test.expect(1);
    exec('grunt i18nChecker:simple', execOptions, function(error, stdout) {
      test.equal(
        stdout.indexOf('4 translation keys checked in 3 files') > -1,
        true,
        'Invalid "simple" JSON check result.'
      );
      test.done();
    });
  },
  hierarchy: function(test) {
    test.expect(1);
    exec('grunt i18nChecker:hierarchy', execOptions, function(error, stdout) {
      test.equal(
        stdout.indexOf('6 translation keys checked in 3 files') > -1,
        true,
        'Invalid "hierarchy" JSON check result.'
      );
      test.done();
    });
  },
  invalidFirst: function(test) {
    test.expect(1);
    exec('grunt i18nChecker:invalidFirst', execOptions, function(error, stdout) {
      test.equal(
        stdout.indexOf('Missing translation key second-message-key') > -1,
        true,
        'Invalid "invalidFirst" JSON check result.'
      );
      test.done();
    });
  },
  invalidOther: function(test) {
    test.expect(1);
    exec('grunt i18nChecker:invalidOther', execOptions, function(error, stdout) {
      test.equal(
        stdout.indexOf('Missing translation key third-message-key') > -1,
        true,
        'Invalid "invalidOther" JSON check result.'
      );
      test.done();
    });
  }
};
