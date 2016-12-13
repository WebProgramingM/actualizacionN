var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('styles', function(){
  gulp.src(['src/styles/**/*.styl'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(stylus())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/styles/**/*.styl", ['styles']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});