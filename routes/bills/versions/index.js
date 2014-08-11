'use strict';

var parseBill = require( '../../../modules/parse-bill-id' );
var get = require( '../../../modules/get' );

var Promise = require( 'bluebird' );

var sunlightApi = require( 'sunlight-congress-api' );
var SUNLIGHT = process.env.SUNLIGHT_CONGRESS_KEY || 'test';
sunlightApi.init( SUNLIGHT );

var getVersion = function ( version ) {
  return get( version.urls.html );
};

module.exports = function( req ) {
  var bill = parseBill( req.params.id );
  var sunlightResp;
  var gpoResp;
  var r = sunlightApi
    .bills()
    .filter( 'bill_id', bill.sunlightId )
    .fields( 'versions' );
  console.log( r.getEndpoint() );
    return r.call()
    .then( function ( resp ) {
      var sunlightResp = JSON.parse( resp ).results[0].versions;
      return Promise.all( sunlightResp.map( getVersion ) ).then( function ( gpoVersions ) {
        return sunlightResp.map( function ( version, i ) {
          version.content = gpoVersions[i][0].body;
          return version;
        });
      });
    });
};
