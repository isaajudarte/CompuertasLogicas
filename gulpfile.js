/// <reference path="typings/node/node.d.ts"/>	
var path = require('path');

var gulp = require('gulp');

var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-replace');

var slowPattern = './styles/chained-adder.less';

gulp.task('fast', function () {
	return gulp.src(['./styles/[^_]*.less', '!' + slowPattern])
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./', { includeContent: false }))
		.pipe(gulp.dest('./styles'));
});


gulp.task('slow', function () {
	return gulp.src(slowPattern)
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(replace(/(^|\n|~ )([^~,]+)( ~[^,{]*)? ~ \2/g, '$1$2$3'))
		.pipe(gulp.dest('./styles'));
});
