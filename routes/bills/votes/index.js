'use strict';

// var TimesApi = require( 'nyt-congress-node' );
// var sunlightApi = require( 'sunlight-congress-api' );
// var SUNLIGHT = process.env.SUNLIGHT_CONGRESS_KEY || 'test';
// sunlightApi.init( SUNLIGHT );

var parseBill = require( '../../../modules/parse-bill-id' );
var sunlightAll = require( '../../sunlight-all' );

module.exports = function( req ) {
  var bill = parseBill( req.params.id );
  // return sunlightApi.votes().filter( 'bill_id', bill.sunlightId ).call();
  var filters = {
    'bill_id': bill.sunlightId
  };

  return sunlightAll( 'votes', filters );

};
