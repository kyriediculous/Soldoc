const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del')

const TSPROJECT = ts.createProject('tsconfig.json')

function scripts() {
    return TSPROJECT.src()
        .pipe(TSPROJECT())
        .js
        .pipe(gulp.dest('./dist/'))
}

function spec() {
    return gulp.src('./src/soldoc/spec/*.mustache')
        .pipe(gulp.dest('./dist/soldoc/spec'))
}

function clean() {
    return del(['./dist'])
}

function watchFiles() {
    gulp.watch('./src/**/*.ts', scripts)
    gulp.watch('./src/soldoc/spec/*.mustache', spec)
}

const build = gulp.series(clean, gulp.parallel(scripts, spec))
const watch = gulp.parallel(watchFiles)

exports.build = build
exports.watch = watch
exports.default = build