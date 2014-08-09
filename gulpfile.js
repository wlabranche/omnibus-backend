'use strict';

var gulp = require( 'gulp' );

var jshint = require( 'gulp-jshint' );
var stylish = require( 'jshint-stylish' );
var mocha = require( 'gulp-mocha' );
var istanbul = require( 'gulp-istanbul' );
var lcov = require( 'mocha-lcov-reporter' );

gulp.task('jshint', function ( cb ) {
  gulp.src([
    './!(coverage|node_modules)/**/*.js'
  ])
  .pipe( jshint() )
  .pipe( jshint.reporter( stylish ) );
});

gulp.task('test', function(cb){
  gulp.src([
    './routes/**/!(test.js)+(*.js)',
    './app/index.js'
  ])
  .pipe( istanbul() )
  .on( 'finish', function(){
    gulp.src([
      './routes/**/test.js',
      './app/test.js'
    ])
    .pipe( mocha({ reporter: 'spec' }) )
    .pipe( istanbul.writeReports() )
    .on('end',function(){
      process.exit( 0 );
    });
  });
});

gulp.task( 'default', [ 'jshint', 'test' ] );
