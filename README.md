[![NPM version](https://img.shields.io/npm/v/grunt-i18n-checker.svg)](https://npmjs.org/package/grunt-i18n-checker) [![Build Status](https://travis-ci.org/gbourel/grunt-i18n-checker.svg?branch=master)](https://travis-ci.org/gbourel/grunt-i18n-checker) [![devDependencies Status](https://david-dm.org/gbourel/grunt-i18n-checker/dev-status.svg)](https://david-dm.org/gbourel/grunt-i18n-checker?type=dev)

grunt-i18n-checker
====================

> A simple checker which ensure consistency between i18n JSON data, such as files used by https://github.com/angular-translate/angular-translate.

Checks run
----------

* Every key found in first JSON translation file also exists in all other JSON files (ie. checks there is no missing key in other files).
* All keys found in each JSON file also exists in first file found (ie. checks there is no missing key in first file).


Getting started
--------------------

If this is the first time you're using [Grunt](http://gruntjs.com/), the [getting started guide](http://gruntjs.com/getting-started) will show you how to get up and running.

Once you have that installed, with a [Gruntfile](http://gruntjs.com/sample-gruntfile) set for your code, you can install the plugin with:

<pre lang=shell>
npm install grunt-i18n-checker --save-dev
</pre>

In your Gruntfile, add the line:

<pre lang=js>
grunt.loadNpmTasks( 'grunt-i18n-checker' );
</pre>

Running and configuring
--------------------

_Run this task with the `grunt i18nChecker` command._

This is designed to be very simple and need only a few configuring for the most common cases.

You can specify the targets and options for the task using the normal Grunt configuration – see Grunt's [guide on how to configure tasks](http://gruntjs.com/configuring-tasks) in general.

### Options

#### src
Type: `string`
Required

The directory where JSON files (*.json) will be read.



Example uses
--------------------

Looks for all `*.json` files in `www/i18n/` subdirectory.

<pre lang=js>
  i18nChecker: {
    all: {
      src: 'www/i18n/'
    }
  }
</pre>
