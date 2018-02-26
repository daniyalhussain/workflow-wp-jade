var gulp = require('gulp')
  sass = require('gulp-sass'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  jade = require('gulp-jade-for-php'),
  livereload = require('gulp-livereload'),
  rename = require("gulp-rename"),
  path = require('path'),
  jadeModules = require('gulp-jade-modules');


gulp.task('sass', function () {
   gulp.src('./library/scss/application.scss')
      .pipe(sass())
      .pipe(rename("style.css"))
      .pipe(gulp.dest('./../library/css'))
      .pipe(livereload());
});

gulp.task('js', function () {
  gulp.src('./library/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('fail'))
      .pipe(concat('theme.js'))
      .pipe(gulp.dest('./../library/js'))
      .pipe(livereload());
});

gulp.task('img', function() {
  gulp.src('./library/img/*.{png,jpg,gif}')
      .pipe(imagemin({
        optimizationLevel: 7,
        progressive: true
      }))
      .pipe(gulp.dest('./../img'))
      .pipe(livereload());
});

gulp.task('jade', function(){
  gulp.src('./*.jade')
      .pipe(jade())
      .pipe(gulp.dest('./../'))
      .pipe(livereload());
  gulp.src('./components/*.jade')
      .pipe(jade())
      .pipe(gulp.dest('./../components'))
      .pipe(livereload());
  gulp.src('./pages/*.jade')
      .pipe(jade())
      .pipe(gulp.dest('./../templates'))
      .pipe(livereload());
});

gulp.task('wordpress', function() {
  gulp.src('./style.css')
      .pipe(gulp.dest('./../'))
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./library/scss/*.scss', ['sass']);
  gulp.watch('./library/js/*.js', ['js']);
  gulp.watch('./library/img/*.{png,jpg,gif}', ['img']);
  gulp.watch('./*.jade', ['jade'])
  gulp.watch('./components/*.jade', ['jade'])
  gulp.watch('./style.css', ['wordpress'])
});

gulp.task('default', ['sass', 'js', 'img', 'jade', 'watch']);
