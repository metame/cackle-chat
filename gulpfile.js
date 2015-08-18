var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task("transpile", function () {
  return gulp.src("public/js/**/*.es6")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("./public/js/dist"));
});

gulp.task("minify", ["transpile"], function () {
  return gulp.src("public/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("public/js/dist"));
});

gulp.task("default", ["minify"]);

