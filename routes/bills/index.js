'use strict';

var express = require('express');
var router = express.Router();

var amendments = require( './amendments' );
var details = require( './details' );
var subjects = require( './subjects' );
var votes = require( './votes' );
var redis = require( '../redis.js' );

router.get( '/:id', function ( req, res ) {
  redis( req.params.id, details ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/amendments', function ( req, res ) {
  redis( req.params.id, amendments ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/subjects', function ( req, res ) {
  redis( req.params.id, subjects ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/votes', function ( req, res ) {
  votes( req.params.id ).then( function ( data ) {
    res.json( data );
  });
});

module.exports = router;
