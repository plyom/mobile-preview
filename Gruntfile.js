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
    clean: ["dist/**"]
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', [
    'clean',
    'jshint',
    'concat:basic',
    'uglify:dist',
    'copy:dist'
  ]);

};