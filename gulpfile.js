var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task("transpile", function () {
  return gulp.src("public/**/*.es6")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write(".b"))
    .pipe(gulp.dest("public"));
});

gulp.task("minify", ["transpile"], function() {
    return gulp.src("public/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("public"));
});

gulp.task("default", ["minify"]);

