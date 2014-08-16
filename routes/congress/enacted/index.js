'use strict';

// var Promise = require( 'bluebird' );
// var TimesApi = require( 'nyt-congress-node' );
// var sunlightApi = require( 'sunlight-congress-api' );

// var SUNLIGHT = process.env.SUNLIGHT_CONGRESS_KEY || 'test';
// sunlightApi.init( SUNLIGHT );

// var NYT = process.env.NYT_CONGRESS_KEY || 'test';
// var timesApi = new TimesApi( NYT );

var sunlightAll = require( '../../sunlight-all' );

module.exports = function ( req ) {

  var filters = {
    'congress': req.params.id,
    'history.enacted': true
  };

  return sunlightAll( 'bills', filters );
};
