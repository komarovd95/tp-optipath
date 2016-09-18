"use strict";

const gulp = require('gulp');
const gulplog = require('gulplog');
const bower = require('gulp-bower');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const bundle = require('gulp-bundle-assets');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const notifier = require('node-notifier');
const del = require('del');
const url = require('url');
const proxy = require('proxy-middleware');


const paths = {
    src: {
        html: "./src/*.html",
        img: "./src/images/*.{gif,svg,png,jpg}",
        js: "./src/js/**/*.js",
        styles: "./src/styles/*.{css,scss}",
        fonts: "./src/fonts/*.*"
    },
    build: "./build/"
};

// webpack
const webpackSettings = require('./webpack.config');
let bundler = null;


gulp.task("bower_install", function() {
    return bower({ cmd: "install" });
});

gulp.task("clean", function() {
    del(paths.build);
});

gulp.task("assets", function() {
    return gulp.src(paths.src.html)
        .pipe(gulp.dest(paths.build));
});

gulp.task("assets:fonts", function() {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.build + "fonts/"));
});

gulp.task("assets:vendor", function() {
    return gulp.src("./bundle.config.js")
        .pipe(bundle())
        .pipe(gulp.dest(paths.build + "vendor/"));
});

gulp.task("styles", function() {
    const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

    return gulp.src(paths.src.styles)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: "Styles",
                    message: err.message
                }
            })
        }))
        .pipe(gulpIf(isDev, sourcemaps.init()))
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulpIf(!isDev, cleanCSS()))
        .pipe(gulpIf(isDev, sourcemaps.write()))
        .pipe(gulp.dest(paths.build));
});

gulp.task("webpack", function(callback) {
    bundler = webpack(webpackSettings, function(err, stats) {
        err = err || stats.toJson().errors[0];

        if (err) {
            notifier.notify({
                title: 'Webpack',
                message: err
            });

            gulplog.error(err);
        } else {
            gulplog.info(stats.toString({ colors: true }));
        }

        if (!webpackSettings.watch && err) {
            callback(err);
        } else {
            callback();
        }
    })
});

gulp.task("watch", function() {
    gulp.watch(paths.src.html, ["assets"]);

    gulp.watch(paths.src.styles, ["styles"]);
});

gulp.task("serve", function() {
    var proxyOptions = url.parse('http://localhost:8080');
    proxyOptions.route = '/external';

    browserSync.init({
        server: {
            baseDir: paths.build,
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: webpackSettings.output.publicPath,
                    stats: { colors: true }
                }),
                webpackHotMiddleware(bundler),
                proxy(proxyOptions)
            ],
            routes: {
                "/bower_components": "./bower_components",
                "/node_modules": "./node_modules"
            }
        }
    });

    browserSync.watch(paths.build + "**/*.*").on('change', browserSync.reload);
});

gulp.task("build", ["assets", "assets:vendor", "assets:fonts", "webpack", "styles"]);

gulp.task("dev", ["build", "watch", "serve"]);

gulp.task("default", ["dev"]);

gulp.task("prod", ["build"]);

gulp.task("install", ["bower_install"]);
