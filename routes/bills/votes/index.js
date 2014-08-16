'use strict';

var parseBill = require( '../../../modules/parse-bill-id' );
var sunlightAll = require( '../../sunlight-all' );

module.exports = function( req ) {
  var bill = parseBill( req.params.id );
  var filters = {
    'bill_id': bill.sunlightId
  };

  return sunlightAll( 'votes', filters );

};
