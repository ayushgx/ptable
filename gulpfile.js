var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var terser = require('gulp-terser');//because es6 is not supported in gulp-uglify and gulp-uglify-es is no longer maintained
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var autoprefix = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
})

gulp.task('useref', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', terser()))
        .pipe(gulpIf('*.css', autoprefix({
            cascade: false
        })))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
})

// gulp.task('fonts', function(){
//     return gulp.src('src/fonts/**/*')
//         .pipe(gulp.dest('dist/fonts'))
// })

gulp.task('images', function () {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'))
})

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
})