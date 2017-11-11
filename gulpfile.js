var gulp = require('gulp');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();


gulp.task('styles', function(){
	return gulp.src('./styles/main.styl')
	.pipe(plumber())
	.pipe(stylus({
		compress: true
	}))
	.pipe(rename({suffix: '.min'}))
	.pipe(plumber.stop())
	.pipe(gulp.dest('./css/'))
	.pipe(browserSync.stream());
});

gulp.task('images', function(){
	gulp.src('./img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./img/'));
});

// Static Server + watching stylus/php files
gulp.task('serve', ['styles'], function() {
    browserSync.init({
		proxy: "http://localhost:8888",
		notify: false
    });
    gulp.watch("./styles/*.styl", ['styles']);
    gulp.watch("./css/**/*.css", ['styles']);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
    gulp.watch(["./*.php", "./locations/array.php"]).on('change', browserSync.reload);
    gulp.watch("./views/**/*.twig").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);


