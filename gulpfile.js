var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('sass', function(){
  return gulp.src('app/app.sass')
    .pipe(sass())
    .pipe(gulp.dest('public/styles'))
});

gulp.task('browserify', function() {
  return browserify('app/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('templates', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('public'));
});

gulp.task('fonts', function() {
  return gulp.src('app/resources/fonts/*.ttf')
   .pipe(gulp.dest('public/resources/fonts'));
});

gulp.task('watch', function() {
  gulp.watch('app/**/*{js,sass,html,ttf}', ['browserify', 'sass', 'templates', 'fonts']);
});

gulp.task('default', ['browserify', 'sass', 'templates', 'fonts']);
