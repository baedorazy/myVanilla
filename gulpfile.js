// gulpfile.js
const gulp          = require('gulp');
    gp_concat       = require('gulp-concat'),
    gp_rename       = require('gulp-rename'),
    gp_terser       = require('gulp-terser'),
    gp_minify       = require('gulp-minify');
    
const  gp_sass      = require('gulp-sass'),
       gp_clean_css = require('gulp-clean-css');

const gp_image      = require('gulp-image');
const fs = require('fs');

const SRC = {
    js: './src/js/',
    img: './src/images/',
    scss: './src/scss/',
    less: './src/less/',
};

const DIST = {
    js: './dist/js/',
    css: './dist/css/',
    img: './dist/images'
};

gulp.task('minifyJs', function(){
    return gulp.src([`${SRC.js}*.js`])
    .pipe(gp_concat('all.min.js'))
    .pipe(gulp.dest(DIST.js))
    .pipe(gp_terser())
    .pipe(gulp.dest(DIST.js));
});

gulp.task('sassCss', function () {
    return gulp.src(`${SRC.scss}/*.scss`)
    .pipe(gp_sass().on('error', gp_sass.logError))
    .pipe(gulp.dest(`${DIST.css}`));
});

gulp.task('minifyCss', () => {
    return gulp.src(`${SRC.less}*.css`)
    .pipe(gp_clean_css({compatibility: 'ie8'}))
    .pipe(gulp.dest(`${DIST.css}`));       // 출력 경로
});

gulp.task('cpImg', function () {
    gulp.src(`${SRC.img}*.*`)
    .pipe(gp_image())
    .pipe(gulp.dest(`${DIST.img}`));
});

gulp.task('watch', function() {
    gulp.watch(`${SRC.scss}*.scss`, gulp.series('sassCss'));
    gulp.watch(`${SRC.js}*.js`, gulp.series('minifyJs'));
    gulp.watch(`${SRC.img}*.*`, gulp.series('cpImg'));
});

gulp.task('default', gulp.series(['minifyJs', 'sassCss', 'watch']));