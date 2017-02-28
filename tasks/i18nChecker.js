'use strict';

var path =  require('path'),
  fs =      require('fs');

/*jshint node:true */
module.exports = function(grunt) {

  grunt.registerMultiTask('i18nChecker', function() {
    var ok,
      inputFiles,
      jsonFilenameRegex = /(.*)\.json$/,
      primaryFile,
      primaryKeys,
      fileCount = 0,
      keyCount = 0;

    function readKeys(dir, filename) {
      var keys;

      try {
        keys = grunt.file.readJSON(path.resolve(dir, filename));
      } catch (e) {
        grunt.log.error('Loading translations failed: "' + e + '".');
        ok = false;
        throw e;
      }

      return keys;
    }

    function checkMatches(firstKeys, otherKeys, filename) {
      var key;
      for (key in firstKeys) {
        if (!otherKeys[key]) {
          grunt.log.error('Missing translation key ' + key + ' in ' + filename);
          return;
        }
        if (typeof(otherKeys[key]) === 'object') {
          checkMatches(firstKeys[key], otherKeys[key], filename);
        } else {
          keyCount += 1;
        }
      }
    }

    if (this.filesSrc.length === 0) {
      grunt.log.error('Target directory does not exist.');
      return false;
    }

    ok = true;

    this.filesSrc.forEach(function(dir) {
      // reset primaryKeys and filename
      primaryFile = null;
      primaryKeys = null;
      inputFiles = fs.readdirSync(dir).filter(function(value) {
        return value.match(jsonFilenameRegex);
      });

      inputFiles.forEach(function(jsonFile) {
        var keys = readKeys(dir, jsonFile);
        // First file found, init keys reference array
        if (primaryKeys === null) {
          primaryFile = jsonFile;
          primaryKeys = keys;
          return;
        }

        checkMatches(primaryKeys, keys, jsonFile);
        checkMatches(keys, primaryKeys, primaryFile);
      });
      fileCount = inputFiles.length;
      keyCount /= (fileCount - 1) * 2;
    });

    if (!ok) {
      return false;
    }

    grunt.log.ok(keyCount + ' translation key' + (keyCount > 1 ? 's' : '') + ' checked in ' +
      fileCount + ' file' + (fileCount > 1 ? 's' : ''));
  });
};
