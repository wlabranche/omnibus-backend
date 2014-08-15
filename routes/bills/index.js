'use strict';

var express = require('express');
var router = express.Router();

var amendments = require( './amendments' );
var details = require( './details' );
var subjects = require( './subjects' );
var votes = require( './votes' );
var search = require( './search' );
var versions = require( './versions' );

var cacheInterceptor = require( '../interceptor.js' ).interceptor;
var tryMeta = require( '../interceptor.js' ).tryMeta;
var setMeta = require( '../interceptor.js' ).setMeta;
var buildMeta = require( '../buildMeta.js' );

var integrateMetadata = function( destination, request, response ) {
  var metaData;
  var metaUrl = request.url.substring(1).split('/')[0];
  tryMeta(metaUrl)
    .then(function(data){
      metaData = JSON.parse(data);
    });
  cacheInterceptor( request, destination ).then( function ( data ) {
    setMeta(metaUrl, JSON.stringify(buildMeta(data, metaData)));
    response.json( data );
  });
};

router.get( '/search', function ( req, res ) {
  cacheInterceptor( req, search ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/versions', function ( req, res ) {
  integrateMetadata( versions, req, res );
});

router.get( '/:id', function ( req, res ) {
  integrateMetadata( details, req, res );
});

router.get( '/:id/amendments', function ( req, res ) {
  integrateMetadata( amendments, req, res );
});

router.get( '/:id/subjects', function ( req, res ) {
  integrateMetadata( subjects, req, res );
});

router.get( '/:id/votes', function ( req, res ) {
  integrateMetadata( votes, req, res );
});


module.exports = router;
