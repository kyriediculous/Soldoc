var gulp = require('gulp');
var ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json')

gulp.task('scripts', function () {
    var tsResult = tsProject.src().pipe(tsProject())
    return tsResult.js.pipe(gulp.dest('./dist'))
});

gulp.task('copy',
    function () {
        return gulp.src(['./src/soldoc/spec/*.mustache', '!./**/*.ts'])
            .pipe(gulp.dest('./dist/soldoc/spec'));
    }
);



gulp.task('default', gulp.parallel('scripts', 'copy'))