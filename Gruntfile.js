module.exports = function(grunt) {

  /*
  ===========
  PLUGINS
  ===========
  1. imagemin - compress images
  2. responsive images - create multiple size images for responsive use
  3. responsive images extender - scan html files for img tags and add srcset if the responsive images are there
  4. postcss: autoprefixer - postcss allows processing of css, autoprefixer is a plugin for it that adds prefixes for legacy browser support
  5. uglify - minify and concat js
  6. cssmin - minify and concat css
  7. newer - lets designated plugins run only on updated files when running newer:pluginname

  ============
  TASK TARGETS
  ============
  dev: (default)
  runs tasks that matter just for dev environment

  */

  var mozjpeg = require('imagemin-mozjpeg'); //plugin for imagemin

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.

    // imagemin plugin - optimize image compression
    imagemin: {
        dynamic: { // target
            options: {
                optimizationLevel: 7, // max optimize pngs
                progressive: true, // progressive jpgs
                interlaced: true, // progressive gifs
                use: [mozjpeg({quality:80})] // use the mozjpeg optimizer plugin for imagemin because it's better for web
            },
            files: [{
                expand: true, // Enable dynamic expansion
                cwd: 'src/', // Src matches are relative to this path
                src: ['*.{png,jpg,gif}'], // Actual patterns to match, case SENSITIVE
                dest: 'src/' // Destination path prefix
            }]
        },
        img_folder: { // for optimizing stuff already in the img folder
          options: {
              optimizationLevel: 7, // max optimize pngs
              progressive: true, // progressive jpgs
              interlaced: true, // progressive gifs
              use: [mozjpeg({quality:80})] // use the mozjpeg optimizer plugin for imagemin because it's better for web
          },
          files: [{
              expand: true, // Enable dynamic expansion
              cwd: 'img/', // Src matches are relative to this path
              src: ['*.{png,jpg,gif}'], // Actual patterns to match, case SENSITIVE
              dest: 'img/' // Destination path prefix
          }]
        },
        // for optimizing just favicons
        icons: {
          options: {
              optimizationLevel: 7, // max optimize pngs
          },
          files: [{
              expand: true, // Enable dynamic expansion
              cwd: 'img/Favicons/images/', // Src matches are relative to this path
              src: ['**/*.png'], // Actual patterns to match, case SENSITIVE
              dest: 'img/Favicons/images/' // Destination path prefix
          }]
        }
    },

    // responsive images plugin - generate multiple sizes of images
    responsive_images: {
      dev: {
        //options {

        //},
        files: [{
            expand: true,
            src: ['**/*.{jpg,gif,png}'], // double asterisk matches subdirectories in addition to current
            cwd: 'src/srcset',
            dest: 'src/'
        }]
      }
    },

    // postcss - postprocess your css using the autoprefixer plugin
    postcss: {
      options: {
        map: true,
        processors: [
          // load autoprefixer plugin
          require('autoprefixer')({
            browsers: ['last 2 versions','ie 9-10'] // prefix to the last 2 versions of browsers
          })
        ]
      },
      dist: {
        src: 'src/css/style.css', // only prefix my stylesheet
        dest: 'build/css/style.css'
      }
    },
    // uglify plugin - minifies files
    uglify: {
      js: {
        files: {
          // output : [input(s)]
          'js/scripts.min.js' : [
            'js/data.js',
            'js/helper.js',
            'js/resumeBuilder.js',
            'js/plugins.js'
          ]
        }
      },
    },
    cssmin: {
      options: {
        // merges longhand properties into a single shorthand one, might be dangerous
        shorthandCompacting: false,
      },
      all_css: {
        files: {
          // output : [input(s)]
          'css/style.min.css': [
            'css/normalize.css',
            'css/main.css',
            'css/style.css'
          ]
        }
      }
    },
    watch: {
      scripts: {
        // watch these files for changes
        files: ['js/data.js',
                'js/helper.js',
                'js/resumeBuilder.js',
                'js/plugins.js'],
        // concat and minify js
        tasks: ['uglify:js']
      },
      css: {
        files: ['css/main.css',
                'css/style.css'],
        // concat and minify css files
        tasks: 'cssmin:all_css'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-responsive-images-extender');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-newer');

  // Default task.
  grunt.registerTask('default', [
    'responsive_images',
    'imagemin',
    'postcss',
  ]);

  // Optimize task - default optimization tasks I'd want anytime I update or
  // do some deve work stuff in the source files
  grunt.registerTask('optimize', [
    'newer:imagemin:img_folder',
    'uglify:js',
    'cssmin'
  ]);

};
