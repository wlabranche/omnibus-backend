'use strict';

var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'static-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var cors = require( 'cors' );

var api = {
  bills: require( '../routes/bills' ),
  congress: require( '../routes/congress' )
};

var app = express();


// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( cors() );
app.use( favicon() );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ));

// add routing for each resource defined in our api
Object.keys( api ).forEach( function ( resource ) {
  app.use( '/api/' + resource, api[resource] );
});

/// catch 404 and forwarding to error handler
app.use( function ( req, res, next ) {
  var err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
});

/// error handlers

// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
  app.use( function ( err, req, res, next ) {
    res.json( err.status, { err: err.toString(), stackTrace: err.stack.toString() });
  });
}

// production error handler
// no stacktraces leaked to user
app.use( function ( err, req, res, next ) {
  res.json( err.status );
});

module.exports = app;
