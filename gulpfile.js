var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');

gulp.task("js", function () {
  gulp.src("public/js/**/*.es6")
    .pipe(watch("public/js/**/*.es6"))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest("./public/js/dist"))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("public/js/dist"));
});

gulp.task('sass', function () {
    gulp.src('public/css/*.scss')
        .pipe(watch('public/css/*.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('css/maps'))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('callback', function (cb) {
    watch(['public/css/*.css','public/js/**/*.es6'], function () {
        gulp.src(['public/css/*.css','public/js/**/*.es6'])
            .pipe(watch(['public/css/*.css','public/js/**/*.es6']))
            .on('end', cb);
    });
});

gulp.task("default", ["js", "sass", "callback"]);

