'use strict';

var sunlightAll = require( '../../sunlight-all' );

module.exports = function ( req ) {

  var filters = {
    'congress': req.params.id,
    'history.enacted': true
  };

  return sunlightAll( 'bills', filters );
};
