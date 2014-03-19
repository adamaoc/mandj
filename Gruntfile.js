module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		watch: {
			scss: {
				files: ['scss/**/*.scss'],
				tasks: 'scss'
			},
			html: {
				files: ['src/**/*.hbs'],
				tasks: 'html'
			},
			js: {
				files: ['js/**/*.js'],
				tasks: ['js', 'uglify']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'dist/**/*.html',
					'assets/css/{,*/}*.css',
					'assets/js/{,*/}*.js'
				]
			}
		},
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'compressed'
				},
				files: {
					'assets/css/style.css': 'scss/style.scss'
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: './'
				}
			}
		},

		// started messing up for whatever reason... not using any longer
		// imagemin: { 
		// 	dynamic: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: 'src/img/',
		// 			src: ['*.{png,jpg,gif}'],   // Actual patterns to match
		// 			dest: 'assets/img/'
		// 		}]
		// 	}
		// },

		uglify: {
			options: {
				mangle: {
					except: ['jquery', 'lazyload']
				}
			},
			my_target: {
				files: {
					'assets/js/main.min.js': ['js/jquery.js', 'js/lazyload.js', 'js/main.js']
				}
			}
		},

		sitemap: {
			dist: {
				siteRoot: 'dist/',
				homepage: 'http://mandjconstructionremodeling.com'
			}
		},


		assemble: {
			options: {
				flatten: true,
				layout: 'layout.hbs',
				layoutdir: 'src/templates/layouts',
				assets: 'assets',
				partials: ['src/templates/pages/*.hbs', 'src/templates/pages/**/*.hbs', 'src/templates/parts/*.hbs']
			},
			demo: {
				options: {
					data: ['src/data/*.{json,yml}']
				},
				files: {
					'dist/': ['src/templates/pages/*.hbs', 'src/templates/pages/**/*.hbs']
				}
			}
		},

	});

	// Default task
	grunt.registerTask('default', ['sass', 'sitemap', 'assemble', 'uglify']);

	grunt.registerTask('scss', ['sass']);
	grunt.registerTask('html', ['assemble']);
	grunt.registerTask('js', ['uglify']);

	grunt.registerTask('dev', ['connect', 'uglify', 'sitemap', 'watch']);

	grunt.loadNpmTasks('assemble');
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
