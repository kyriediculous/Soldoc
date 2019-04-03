const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del')

const TSPROJECT = ts.createProject('tsconfig.json')

function scripts() {
    return TSPROJECT.src()
        .pipe(TSPROJECT())
        .pipe(gulp.dest('./out'))
}

function spec() {
    return gulp.src('./src/soldoc/spec/*.mustache')
        .pipe(gulp.dest('./out/soldoc/spec'))
}

function testContracts() {
    return gulp.src('./src/test/**/*.sol')
        .pipe(gulp.dest('./out/test/'))
}

function clean() {
    return del(['./out'])
}

function watchFiles() {
    gulp.watch('./src/**/*.ts', scripts)
    gulp.watch('./src/soldoc/spec/*.mustache', spec)
    gulp.watch('./src/test/**/*.sol', testContracts)
}

const build = gulp.series(clean, gulp.parallel(scripts, spec, testContracts))
const watch = gulp.parallel(watchFiles)

exports.build = build
exports.watch = watch
exports.default = build