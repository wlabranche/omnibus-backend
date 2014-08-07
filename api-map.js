var Promise = require( 'bluebird' );
var TimesApi = require( 'nyt-congress-node' );
var sunlightApi = require( 'sunlight-congress-api' );

var NYT = process.env.NYT_CONGRESS_KEY || require( './keys' ).NYT;
var SUNLIGHT = process.env.SUNLIGHT_CONGRESS_KEY || require( './keys' ).SUNLIGHT;

var timesApi = new TimesApi( NYT );
sunlightApi.init( SUNLIGHT );

module.exports = {
  singleBill: function( id ) {

    id = id.split( '-' );
    var congressNumber = id[0];
    var billNumber = id[1];

    var timesReq = timesApi.billDetails({
      billId: billNumber,
      congressNumber: congressNumber
    });

    var sunlightBillId = [ id[1].toLowerCase(), id[0] ].join( '-' );
    var sunlightReq = sunlightApi.bills().filter( 'bill_id', sunlightBillId ).call();

    return Promise.all([ timesReq, sunlightReq ])
      .then( function ( data ) {
        return {
          congress: id[0],
          billId: id[1],
          timesResponse: data[0],
          sunlightResponse: data[1]
        };
      });
  }

};
