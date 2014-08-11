'use strict';

var request = require( 'request' );
var Promise = require( 'bluebird' );

Promise.promisifyAll( request );

module.exports = function ( url ) {
  return request.getAsync( url );
};
