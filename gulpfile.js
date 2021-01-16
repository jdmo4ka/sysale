
const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const cacheFiles = require('gulp-cache-files');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

function scss() {
    return src('scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
    .pipe(cleancss(({ level: {1: {specialComments: 0}} })))
    .pipe(dest('css'));
}

function js() {
    return src('js-dev/*.js')
    .pipe(babel({presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(dest('js'));
}

function img() {
    return src('img/*.{png,jpg,gif,svg}', {read: false})
    .pipe(cacheFiles.filter('./mycache/manifest.json'))
    .pipe(imagemin({
        optimizationLevel: 7,
        progressive: true
    }))
    .pipe(dest('img'))
    .pipe(cacheFiles.manifest())
}

function watchfile() {
    watch(['scss/*.scss'], scss);
    watch(['js-dev/*.js'], js);
}

function build(cb) {
    js();
    img();
    cb();
}

exports.scss = scss;
exports.img = img;
exports.js = js;
exports.build = build;
exports.watchfile = watchfile;
exports.default = parallel(scss,img,js, watchfile);
