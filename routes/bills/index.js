'use strict';

var express = require('express');
var router = express.Router();

var Congress = require( 'nyt-congress-node' );

var client = new Congress( process.env.NYT_CONGRESS_KEY );

router.get( '/:id', function ( req, res ) {
  client.billDetails({
    billId: req.params.id
  });
  res.send( req.params.id );
});

module.exports = router;
