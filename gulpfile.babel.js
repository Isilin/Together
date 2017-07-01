'use strict';

import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import babel from 'gulp-babel';

/* ========== CLIENT TASKS ========== */

gulp.task('build', function () {
    return gulp.src('src/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/src'));
});

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['build']);
});

gulp.task('dev', ['build', 'watch']);

/* ========== SERVER TASKS ========== */

gulp.task('babel-server', function () {
    gulp.src('www/server.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/www/'));
})

gulp.task('server', ['babel-server'], function () {
    nodemon({
        script: 'dist/www/server.js', 
        env: { 'NODE_ENV': 'development' },
        tasks: ['babel-server'],
        watch: ['www/', 'node_modules']
    });
});