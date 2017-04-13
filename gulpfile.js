"use strict";

const gulp = require("gulp"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    browserSync = require("browser-sync"),
    del = require("del"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    cache = require("gulp-cache"),
    autoprefixer = require("gulp-autoprefixer");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

//Обработка файлов SCSS, добавление кроссбраузерных префиксов и
//создание файлов CSS и CSS.MAP в директории APP (разработка)
gulp.task("sass", function () {
    let pipeline = gulp.src("app/scss/styles.scss");

    if (isDevelopment) {
        pipeline = pipeline.pipe(sourcemaps.init());
    }

    pipeline = pipeline.pipe(sass()).pipe(autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true
    }));

    if (isDevelopment) {
        pipeline = pipeline.pipe(sourcemaps.write("."));
    }

    return pipeline = pipeline.pipe(gulp.dest("app/css"));
});

//Добавление файлов библиотек в директорию APP (разработка)
gulp.task("libs", function () {
    return gulp.src("node_modules/normalize.css/normalize.css")
        .pipe(gulp.dest("app/libs"))
});

//Запуск модуля "browser-sync"
gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "app"
        },
        notify: false
    });
});

//Отслеживание изменений в стилях и .html
gulp.task("watch", ["browser-sync", "sass"], function () {
    gulp.watch("app/scss/**/*.scss", ["sass"]);
    gulp.watch("app/*.html", browserSync.reload);
});

//Очистить при пересборке директорию DIST от старых файлов
gulp.task("clean", function () {
    return del.sync("dist");
});

//Обработка изображений
gulp.task("img", function () {
    return gulp.src("app/img/**/*")
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest("dist/img"));
});

//Сборка
gulp.task("build", ["clean", "img", "sass"], function () {

    let buildCss = gulp.src([
            "app/libs/normalize.css",
            "app/css/styles.css"
        ])
        .pipe(gulp.dest("dist/css"));

    let buildJs = gulp.src("app/js/**/*.js")
        .pipe(gulp.dest("dist/js"));

    let buildHtml = gulp.src("app/*.html")
        .pipe(gulp.dest("dist"));
});

//Очистить кэш
gulp.task("clear", function () {
    return cache.clearAll();
})

//Дефолтный таск
gulp.task("default", ["watch"]);


//отправить проект на Github Pages
gulp.task("gitpages", function () {
    return gulp.src("dist/**/*.*")
        .pipe(gulp.dest("../leneli.github.io/trains"));
});