/**
 * Created by dieffrei on 10/12/16.
 */
const gulp = require('gulp');
const del = require('del');
const zip = require('gulp-zip');


gulp.task('build', function() {
    del.sync(['dist']);
    //gulp.src('bower_components/salesforce-lightning-design-system/assets/**').pipe(gulp.dest('dist/assets'));
    gulp.src('bower_components/**/**').pipe(gulp.dest('dist/bower_components'));
    gulp.src('*.html').pipe(gulp.dest('dist'));
    gulp.src('js/**').pipe(gulp.dest('dist/js'));
    gulp.src('icon/**').pipe(gulp.dest('dist/icon'));
    gulp.src('*.json').pipe(gulp.dest('dist/'));

});