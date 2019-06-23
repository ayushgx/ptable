var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var terser = require('gulp-terser');//uglify-es supports es6 but not maintained therefore used gulp-terser
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var autoprefix = require('gulp-autoprefixer');
var runSequence = require('gulp4-run-sequence');
var rcs = require('gulp-rcs');//scramble names
var beautify = require('gulp-beautify');
var htmlmin = require('gulp-htmlmin');
var gs = require('gulp-selectors');

gulp.task('clean:dist', function(cb){
    return (del.sync('dist'), cb());
})
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

        // .pipe(gulpIf('*.html', beautify.html({ indent_size: 2 })))
        // .pipe(gulpIf('*.css', beautify.css({ indent_size: 2 })))
        // .pipe(gulpIf('*.js', beautify({ indent_size: 2 })))
        // .pipe(rcs())

        .pipe(gulp.dest('dist'))
})

gulp.task('images', function (cb) {
    return (gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img')), cb())
})

gulp.task('fonts', function(){
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('includes', function(){
    return gulp.src('src/includes/**/*')
        .pipe(gulp.dest('dist/includes'))
})

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
})

gulp.task('minify-html', function(){
    return gulp.src('dist/*.html')
    .pipe(htmlmin({ 
        collapseWhitespace: true,
        removeComments: true
     }))
    .pipe(gulp.dest('dist'))
})

// gulp.task('gs', function(){
//     return gulp.src(["dist/**/*.css","dist/**/*.js","dist/**/*.html"])
//     .pipe(gs.run({
//         'js-strings': ['js']
//     }))
//     .pipe(gs.info())
//     .pipe(gulp.dest("dist"))
// })

gulp.task('build', function(callback){
    runSequence(
        'clean:dist',
        'sass',
        ['useref', 'images', 'fonts', 'includes'],
        'minify-html',
        callback
    )
})