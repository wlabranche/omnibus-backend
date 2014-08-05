'use strict';

var request = require( 'request' );
var rewire = require( 'rewire' );
var chai = require( 'chai' );
var expect = chai.expect;

describe( 'Express application', function () {
  it( 'Should not explode', function () {
    expect( function () {
      require( './' );
    }).to.not.throw();
  });
});

describe( 'Fallback routes', function () {
  var app;
  var server;

  function startInEnv ( env ) {
    process.env.NODE_ENV = env || 'development';
    // use rewire to get a fresh copy of app each time
    app = rewire( './' );
    server = app.listen( 3000 );
  }

  afterEach( function () {
    server.close();
  });

  it( 'In development, should 404 with error info', function ( done ) {
    startInEnv();
    request( 'http://localhost:3000/nope', function ( err, res, body ) {
      var json = JSON.parse( body );
      expect( res.statusCode ).to.equal( 404 );
      expect( json.err ).to.equal( 'Error: Not Found' );
      expect( json.stackTrace ).to.exist;
      done();
    });
  });

  it( 'In production, should 404 without error info', function ( done ) {
    startInEnv( 'production' );
    request( 'http://localhost:3000/nope', function ( err, res, body ) {
      var json = JSON.parse( body );
      expect( json.err ).to.not.exist;
      expect( json.stackTrace ).to.not.exist;
      done();
    });
  });
});
