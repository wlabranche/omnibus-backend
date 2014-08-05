var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var lcov = require('mocha-lcov-reporter');


gulp.task('test', function(cb){
  gulp.src([
    './routes/**/!(test.js)+(*.js)',
    './app/index.js'
    ])
    .pipe(istanbul())
    .on('finish', function(){
      gulp.src([
        './routes/**/test.js',
        './app/test.js'
      ])
        .pipe(mocha({reporter: 'spec'}))
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});
