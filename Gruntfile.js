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

		sass: {
			build: {
				files : [
					{
						src : ['**/*.scss', '!**/_*.scss'],
						cwd : 'scss',
						dest : 'css',
						ext : '.css',
						expand : true
					}
				],
				options : {
					style : 'expanded'
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

		copy: {
			css: {
				files: [
					{ expand: true, cwd: './css', src: ['./**/*.*'], dest: 'assets/css' }
				]
			}
		}

	});

	// Default task
	grunt.registerTask('default', ['sass', 'sitemap', 'assemble', 'copy', 'uglify']);

	grunt.registerTask('scss', ['sass', 'copy:css']);
	grunt.registerTask('html', ['assemble']);
	grunt.registerTask('js', ['uglify']);

	grunt.registerTask('dev', ['connect', 'uglify', 'sitemap', 'watch']);
	grunt.registerTask('demo', ['copy:demo', 'assemble:demo']);
	grunt.registerTask('deploy', ['gh-pages']);

	grunt.loadNpmTasks('assemble');
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
