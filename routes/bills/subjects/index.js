var Promise = require( 'bluebird' );
var TimesApi = require( 'nyt-congress-node' );
var sunlightApi = require( 'sunlight-congress-api' );

// var SUNLIGHT = process.env.SUNLIGHT_CONGRESS_KEY || 'test';
// sunlightApi.init( SUNLIGHT );

var NYT = process.env.NYT_CONGRESS_KEY || 'test';
var timesApi = new TimesApi( NYT );

module.exports = function( id ) {
  id = id.split( '-' );
  var congressNumber = id[0];
  var billNumber = id[1];

  return timesApi.billSubjects({
    billId: billNumber,
    congressNumber: congressNumber
  });
};
