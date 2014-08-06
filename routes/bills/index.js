'use strict';

var express = require('express');
var router = express.Router();

var Congress = require( 'nyt-congress-node' );

var client = new Congress( process.env.NYT_CONGRESS_KEY );

router.get( '/:id', function ( req, res ) {
  var id = req.params.id.split( '-' );
  client.billDetails({
    billId: id[1],
    congressNumber: id[0]
  }).then( function( data ) {
    res.json( data );
  });
});

module.exports = router;
