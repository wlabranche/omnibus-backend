'use strict';

var redisConfig = {
  port: process.env.REDIS_PORT || null,
  url: process.env.REDIS_URL || null,
  key: process.env.REDIS_KEY || null
};

var client, get, set, del;

var interpolateParams = require( '../modules/interpolate-params' );
var meta = require('./metaStore.js');
var redis = require( 'redis' );
var Promise = require( 'bluebird' );

// set up redis client if we've got the env vars
if ( redisConfig.port && redisConfig.url && redisConfig.key ) {

  client = redis.createClient( redisConfig.port, redisConfig.url );
  get = Promise.promisify( client.get, client );
  set = Promise.promisify( client.set, client );
  del = Promise.promisify( client.del,  client );

  client.auth( redisConfig.key );
  client.on( 'error', function ( error ) {
    console.log( error );
  });
}

var cacheInterceptor = function ( req, fallback ) {
  if ( !client || req.query.force ) {
    return fallback( req ); // returns promise
  }

  var path = interpolateParams( req.path, req.params );

  return tryCache( path )
    // found in cache
    .then( function ( response ) {
      console.log('going to redis');
      return response;
    })
    // not in cache
    .catch( function () {
      console.log('not going to redis');
      return fallback( req ).then( function ( response ) {
        set( path, response );
        return response;
      });
    });
};

var tryCache = function ( key ) {
  return get( key ).then( function ( response ) {
    return new Promise( function ( resolve, reject ) {
      if ( response ) {
        resolve( response );
      } else {
        reject();
      }
    });
  });
};

var queryParse = function( query ){
  query = query + '-meta';
  return query;
};

var tryMeta = function ( key ) {
  key = queryParse( key );
  // del();
  return get( key )
    .then( function( response ) {
      return response;
    })
    .catch( function( error ) {
      console.log( error );
    });
};

var setMeta = function ( key, meta ){
  key = queryParse( key );
  del( key )
    .then(function(data){
      set( key, meta )
        .catch( function( error ) {
          console.log( error );
        });  
    })
    .catch(function(err){
      console.log(err);
    });
};



module.exports.interceptor = cacheInterceptor;
module.exports.tryMeta = tryMeta;
module.exports.setMeta = setMeta;
