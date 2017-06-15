module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    loadPath: ['node_modules/foundation-sites/scss']
                },
                files: {
                    'src/css/style.css':'src/sass/style.scss'
                }
            } 
        },
        watch: {
			css: {
				files: 'src/sass/*.scss',
				tasks: ['sass']
			}
		}
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
}; 