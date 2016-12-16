var gulp = require('gulp');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

gulp.task('styles', function(){
  return gulp.src('./assets/styles/main.styl')
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
    proxy: "http://local.nomadscancun.com:8888/new-years-eve",
    notify: false
    });
    gulp.watch("./assets/styles/*.styl", ['styles']);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
    gulp.watch(["./*.html", "./locations/array.php"]).on('change', browserSync.reload);
});


gulp.task('default', ['serve']);


