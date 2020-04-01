// gulpfile.js
var gulp = require('gulp');
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_terser = require('gulp-terser'),
    gp_minify = require('gulp-minify');
    
var sass = require('gulp-sass');
var fs = require('fs');

const SRC = {
    js: './src/js/',
    scss: './src/scss/',
};

const DIST = {
    js: './dist/js/',
    css: './dist/css/',
    img: './dist/images'
};

gulp.task('minify', function(){
    return gulp.src([`${SRC.js}*.js`])
    .pipe(gp_concat('all.min.js'))
    .pipe(gulp.dest(DIST.js)) // .dest 어디에 저장할지 지정
    .pipe(gp_terser())
    .pipe(gulp.dest(DIST.js));
});

// 일반 컴파일
gulp.task('sass', function () {
    return gulp.src(`${SRC}/*.scss`)  // 입력 경로
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${DIST.css}`));  // 출력 경로
});

// gulp4 -> watch
gulp.task('watch', function() {
    gulp.watch(`${SRC.scss}*.scss`, gulp.series('sass'));
    gulp.watch(`${SRC.js}*.js`, gulp.series('minify'));
    gulp.watch(`${SRC.img}*.*`, gulp.series('images'));
});

gulp.task('default', gulp.series(['minify', 'sass', 'watch']));