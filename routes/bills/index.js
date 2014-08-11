'use strict';

var express = require('express');
var router = express.Router();

var amendments = require( './amendments' );
var details = require( './details' );
var subjects = require( './subjects' );
var votes = require( './votes' );
var search = require( './search' );
var versions = require( './versions' );

var cacheInterceptor = require( '../interceptor.js' );

// integrate interceptor
router.get( '/search', function ( req, res ) {
  search( req, votes ).then( function ( data ) {
    res.json( data );
  });
});

// integrate interceptor
router.get( '/:id/versions', function ( req, res ) {
  versions( req ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id', function ( req, res ) {
  cacheInterceptor( req, details ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/amendments', function ( req, res ) {
  cacheInterceptor( req, amendments ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/subjects', function ( req, res ) {
  cacheInterceptor( req, subjects ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/votes', function ( req, res ) {
  cacheInterceptor( req, votes ).then( function ( data ) {
    res.json( data );
  });
});

module.exports = router;
