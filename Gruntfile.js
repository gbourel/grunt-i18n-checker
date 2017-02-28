/*!
 * Grunt file
 */
'use strict';

/*jshint node:true */
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.loadTasks('tasks');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      all: ['*.js', '{tasks,test}/**/*.js']
    },

    jscs: {
      src: '<%= jshint.all %>'
    },

    i18nChecker: {
      simple: {
        src: 'test/simple'
      },
      hierarchy: {
        src: 'test/hierarchy'
      },
      invalidFirst: {
        src: 'test/invalidFirst'
      },
      invalidOther: {
        src: 'test/invalidOther'
      }
    },

    nodeunit: {
      tests: ['test/*_test.js'],
    },

    watch: {
      files: ['<%= jshint.all %>', '.{jshintrc,jshintignore}'],
      tasks: ['test']
    }
  });

  grunt.registerTask('test', ['jshint', 'jscs', 'nodeunit']);
  grunt.registerTask('default', 'test');
};
