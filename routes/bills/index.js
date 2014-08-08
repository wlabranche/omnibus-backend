'use strict';

var express = require('express');
var router = express.Router();

var amendments = require( './amendments' );
var details = require( './details' );
var subjects = require( './subjects' );
var votes = require( './votes' );

router.get( '/:id', function ( req, res ) {
  details( req.params.id ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/amendments', function ( req, res ) {
  amendments( req.params.id ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/subjects', function ( req, res ) {
  subjects( req.params.id ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/votes', function ( req, res ) {
  votes( req.params.id ).then( function ( data ) {
    res.json( data );
  });
});

module.exports = router;
