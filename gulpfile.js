const gulp = require('gulp');
const gp = require('gulp-load-plugins') ();

const sassGlob = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const browserSync = require('browser-sync').create();

const paths = {
    build: './build',                               // paths.build
    templates: {
        pages: 'src/templates/pages/*.pug',         //paths.templates.pages
        src: 'src/templates/**/*.pug',              //paths.templates.src
    },
    styles: {
        src: 'src/styles/**/*.scss',                //paths.styles.src
        dest: 'build/assets/styles/'                //paths.styles.dest
    },    
    img: {
        src: 'src/img/**/*.*',                      //paths.img.src
        dest: 'build/assets/img/'                   //paths.img.dest
    },
    fonts: {
        src: 'src/fonts/**/*.*',                   //paths.fonts.src
        dest: 'build/assets/fonts/'                //paths.fonts.dest
    },
    scripts: {
        src: 'src/scripts/**/*.js',                 //paths.scripts.src
        dest: 'build/assets/js/'                    //paths.scripts.dest
    }
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(gp.plumber())
        .pipe(gp.pug({ pretty: true }))
        .pipe(gulp.dest(paths.build));
}

// scss
function styles() {
    return gulp.src('./src/styles/main.scss')
        .pipe(gp.plumber())
        .pipe(gp.sourcemaps.init())
        .pipe(sassGlob())
        .pipe(gp.sass({outputStyle: 'compressed'}))
        .pipe(groupMediaQueries())
        .pipe(gp.autoprefixer({
            browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gp.rename({suffix: '.min'}))
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
}

// webpack
function scripts() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(gp.plumber())
        .pipe(gulpWebpack(webpackConfig, webpack)) 
        .pipe(gulp.dest(paths.scripts.dest));
}

// clean
function clean() {
    return del(paths.build);
}

// gulp watch
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.img.src, img);
    gulp.watch(paths.scripts.src, scripts);
}

// server(livereload)
function server() {
    browserSync.init({
        server: paths.build
    });
    browserSync.watch(paths.build + '/**/*.*', browserSync.reload);
}

// replace img
function img() {
    return gulp.src(paths.img.src)
        .pipe(gulp.dest(paths.img.dest));
}

// replace fonts
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;
exports.img = img;
exports.fonts = fonts;
exports.watch = watch;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, img, fonts, scripts),
    gulp.parallel(watch, server)
));