module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none',
                    update: true
                },
                files: {
                    "assets/css/design.css": "assets/scss/design.scss"
                }
            }
        },
        concat: {
            dist: {
                src: ['./bower_components/hammerjs/hammer.min.js', 'assets/js/dev.js'],
                dest: 'assets/js/dist.js',
            }
        },
        watch: {
            styles: {
                files: ['**/*.scss', "**/*.html", "**/*.js"],
                tasks: ['sass:dist', 'concat:dist']
            },
            options: {
                livereload: true
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['sass:dist']);
}
