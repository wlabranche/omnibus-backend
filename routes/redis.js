'use strict';

var redisConnect = [
  process.env.REDIS_PORT,
  process.env.REDIS_URL
];

var Promise = require( 'bluebird' ),
    redis = require( 'redis' ),
    nyt = require('./bills'),
    client = redis.createClient.apply(redis, redisConnect);

var get = Promise.promisify( client.get, client ),
    set = Promise.promisify( client.set, client ),
    flush = Promise.promisify( client.flushdb, client);

client.auth(process.env.REDIS_KEY);

client.on( 'error', function ( error ) {
  console.log( error );
});

var redisCheck = function( redisKey, fallback ){
  return get( redisKey )
    .then(function( response ){
      if ( response ){
        console.log('success');
        return response;
      }else{
        console.log( 'fail' );
        return fallback( redisKey )
          .then(function(reply){
            set( redisKey, reply );
            return reply;
          });
      }
    })
    .catch(function( error ){
      console.log( error );
    });
};

module.exports = redisCheck;
