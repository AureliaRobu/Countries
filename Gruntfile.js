module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      babel:{
        files:['js/script.js'],
        tasks: ['babel']
      },
      less: {
        files: ["less/*.less"],
        tasks: ["less"],
      },
      autoprefixer:{
        files:['dist/style.css'],
        tasks:['postcss']
      }
    },
    postcss: {
      options: {
                processors: [require('autoprefixer')({overrideBrowserslist: ['last 2 versions', 'ie 9']})],
      },
      dist: {
        src: "dist/*.css",
        dest:"dist/prefixed.css"
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      dist: {
        files: {
          "dist/script.js": "js/script.js",
        },
      },
    },
    less: {
      development: {
        options: {
          paths: ["less/"],
        },
        files: {
          "dist/style.css": "less/source.less",
        },
      },
    },
  });
  // Load the plugin
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Default task(s).
  grunt.registerTask("default", ["babel", 'less','postcss']);
};
