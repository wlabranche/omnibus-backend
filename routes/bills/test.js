var chai = require( 'chai' );
var request = require( 'request' );
var sinon = require( 'sinon' );
var sinonChai = require( 'sinon-chai' );
var rewire = require( 'rewire' );
var express = require( 'express' );
var expect = chai.expect;
chai.use( sinonChai );

var congressStub = ( function () {
  var Congress = require( 'nyt-congress-node' )
  return function () {
    return sinon.stub( new Congress( 'API-KEY' ) );
  };
})();

describe( 'Bills API', function () {

  var client;
  var router;
  var app;
  var server;

  beforeEach( function () {
    // create a stubbed version of the NYT API wrapper
    client = congressStub();
    // get the bills router
    router = rewire( './' );
    // rewire the bills router to use the API stub
    router.__set__( 'client', client );
    // create a new express app
    app = express();
    // tell the app to use the rewired router
    app.use( '/api/bills', router );
    // start the app
    server = app.listen( 3000 );
  });

  afterEach( function () {
    // stop the app
    server.close();
  });

  describe( "GET /api/bills/:id", function () {

    it( "Should serve GET requests to /api/bills/:id", function ( done ) {
      request( 'http://localhost:3000/api/bills/123', function ( err, resp, body ) {
        expect( err ).to.not.exist;
        expect( resp.statusCode ).to.equal( 200 );
        done();
      });
    });

    it( "Should delegate to Congress::billDetails", function ( done ) {
      request( 'http://localhost:3000/api/bills/123', function ( err, resp, body ) {
        expect( client.billDetails ).to.have.been.called;
        done();
      });
    });

  });

});
