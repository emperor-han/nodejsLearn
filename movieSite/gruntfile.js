module.exports = (grunt) => {
    
      grunt.initConfig({
        watch: {
          jade: {
            files: ['views/**'],
            options: {
              livereload: true
            }
          },
          js: {
            files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
            //tasks:['jshint'],
            options: {
              livereload: true
            }
          }
        },
        nodemon: {
          dev: {
            script: 'app.js',
            options: {
              args: ['dev'],
              nodeArgs: ['--debug'],
              env: {
                PORT: '8080'
              },
              cwd: __dirname,
              ignore: ['node_modules/**'],
              ext: 'js,coffee',
              watch: ['app.js'],
              delay: 1000,
              legacyWatch: true
            }
          }
        },
        concurrent:{
          tasks:['nodemon','watch'],
          options:{
            logConcurrentOutput: true
          }
        }
      });

      grunt.loadNpmTasks('grunt-nodemon'); 
      grunt.loadNpmTasks('grunt-contrib-watch'); 
      grunt.loadNpmTasks('grunt-concurrent');

      grunt.option('force', true);
      grunt.registerTask('default',['concurrent']);
}
