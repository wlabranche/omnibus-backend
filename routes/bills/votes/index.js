var TimesApi = require( 'nyt-congress-node' );
var sunlightApi = require( 'sunlight-congress-api' );

var parseBill = require( '../../../modules/parse-bill-id' );

var SUNLIGHT = process.env.SUNLIGHT_CONGRESS_KEY || 'test';

console.log( sunlightApi );

sunlightApi.init( SUNLIGHT );

module.exports = function( id ) {
  var bill = parseBill( id );
  return sunlightApi.votes().filter( 'bill_id', bill.sunlightId ).call();
};
