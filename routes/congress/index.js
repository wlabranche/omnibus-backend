'use strict';

var express = require('express');
var router = express.Router();

var enacted = require( './enacted' );

var cacheInterceptor = require( '../interceptor.js' );

router.get( '/:id/enacted', function ( req, res ) {
  enacted( req ).then( function ( data ) {
    res.json( data );
  });
});

module.exports = router;
