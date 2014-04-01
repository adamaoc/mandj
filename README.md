Web stack for M&J DFW
================

M&J is a local Dallas, Texas Construction and Remodeling company. They didn't have much direction for their site as this is their first presence online; their biggest concern was having easily viewable images to show off their work to perspective clients. The site is built using Grunt and Static-Site Generation. This allows the site to be extremely quick and easy to maintain. I am also using Sass, jQuery, JavaScript, and PHP for specialized needs through the site.


## Tech Stack

This site is focused on speed and ease of use. It is utilizing Grunt as a static site generator.

* Grunt
  * Concat and Minify `JavaScript` and `SCSS`   
  * Use handlebars for `HTML` templating    
  * Builds a dynamic sitemap   
  * Use Watch and Livereload for Dev process   

* PHP 
  * Used for form submission


* JavaScript 
  * Used for small transitions, determining what to show after a form submission, and a small custom photo gallery lightbox.

* CSS
  * Use all custom css and media queries for responsive features and base typography.   
  * Use `SCSS` for preprocessing

* .htaccess
  * Use for clean URLs    
  * Use for speed - chaching and 404 routing
