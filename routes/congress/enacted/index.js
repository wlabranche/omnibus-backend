'use strict';

var Promise = require( 'bluebird' );
var TimesApi = require( 'nyt-congress-node' );
var sunlightApi = require( 'sunlight-congress-api' );

var SUNLIGHT = process.env.SUNLIGHT_CONGRESS_KEY || 'test';
sunlightApi.init( SUNLIGHT );

// var NYT = process.env.NYT_CONGRESS_KEY || 'test';
// var timesApi = new TimesApi( NYT );

var PER_PAGE = 50;

module.exports = function ( req ) {

  var data = [];

  var firstCall = sunlightApi
    .bills()
    .filter( 'congress', req.params.id )
    .filter( 'history.enacted', 'true' )
    .filter( 'per_page', '50' );

  return firstCall.call().then( function ( response ) {
    data.push( response );
    var count = PER_PAGE;
    var promises = [];

    var d = JSON.parse( response );

    var page = 2;
    while ( count < d.count ) {
      promises.push( sunlightApi.clone( firstCall ).filter( 'page', page ) );
      page += 1;
      count += PER_PAGE;
    }

    return Promise.all( promises.map( function( query ) {
      return query.call().then( function ( response ) {
        data.push( response );
      });
    })).then( function () {
      return data.reduce( function ( acc, response, i ) {
        var results = JSON.parse( response ).results;
        return acc.concat( results );
      }, [] );
    });
  });


};
