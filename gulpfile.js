var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var path = require('path');

var paths = {
	scripts: ['js/*.js', 'js/*/*.js', 'js/*/*/*.js']
};

function handleError (error) {
	console.log(error.toString());
	this.emit('end');
}

gulp.task("default", function () {
	browserify({
		entries: './js/routes.js',
		debug: true
	})
	.transform(babelify)
	.bundle()
	.on('error', handleError)
	.pipe(source('app.js'))
	.pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ["default"])
		.on('error', handleError);
});