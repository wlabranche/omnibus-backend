var chai = require( 'chai' );
var expect = chai.expect;

describe( "Express application", function () {
  it( "Should not explode", function () {
    expect( function () {
      require( '../app.js' );
    }).to.not.throw();
  });
});
