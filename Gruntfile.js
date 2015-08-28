module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      jshint: ["src/**/*.js"]
    },
    concat: {
      options: {
        separator: '\n',
      },
      basic: {
        src: ['src/components/*.js'],
        dest: 'src/mobile-preview.js',
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/mobile-preview.min.js': ['src/mobile-preview.js']
        }
      }
    },
    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'src/', src: ['assets/**'], dest: 'dist/'}
        ],
      },
    },
    clean: ["dist/**"],
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', [
    'clean',
    'jshint',
    'concat:basic',
    'uglify:dist',
    'copy:dist'
  ]);

};