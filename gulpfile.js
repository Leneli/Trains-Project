"use strict";

const gulp = require("gulp");

gulp.task("default", function() {
    return gulp.src("app/**/*.*")
        .on("data", function(file) {
            console.log(file.path);
        })
        .pipe(gulp.dest("dest"));
});


//отправить проект на Github Pages
gulp.task("gitpages", function() {
    return gulp.src("dest/**/*.*")
        .pipe(gulp.dest("../TEST"));
});