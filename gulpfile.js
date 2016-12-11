/**
 * Created by dieffrei on 10/12/16.
 */
const gulp = require('gulp');
const del = require('del');
const zip = require('gulp-zip');
const minify = require('gulp-minify');
const concat = require('gulp-concat');


gulp.task('clear', function() {
    del.sync(['dist']);
});

gulp.task('copy', function() {

    //gulp.src('bower_components/salesforce-lightning-design-system/assets/**').pipe(gulp.dest('dist/assets'));
    gulp.src(['!bower_components/salesforce-lightning-design-system/**', 'bower_components/**/**.*'])
        .pipe(gulp.dest('dist/bower_components'));

    gulp.src('bower_components/salesforce-lightning-design-system/assets/**/**.*').pipe(gulp.dest('dist/assets'));

    gulp.src('*.html').pipe(gulp.dest('dist'));

    gulp.src('js/**/*.js').pipe(gulp.dest('dist/js'));

    gulp.src('icon/**.*').pipe(gulp.dest('dist/icon'));

    gulp.src('*.json').pipe(gulp.dest('dist/'));

    /*gulp.src('dist/js/*.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['bower_components']
            //ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist/min'))*/

});

gulp.task('minify', function() {
    gulp.src('dist/js/**/*.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['bower_components']
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('concat', function() {
    return gulp.src('js/**/*.js')
        .pipe(concat('force-codecoverage-all-dep.js'))
        .pipe(gulp.dest('dist/min'));
});

gulp.task('zip', function() {
    return gulp.src('dist/*')
        .pipe(zip('chrome-ext.zip'))
        .pipe(gulp.dest('dist'));
});


gulp.task('build', ['clear', 'copy', /*'concat',*/ 'minify', 'zip']);
