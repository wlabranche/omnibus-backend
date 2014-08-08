'use strict';

module.exports = function ( str, obj ) {
  return str.replace( /:([a-zA-Z]+)/g, function( a, b ) {
    // a is something like ":id"
    return obj[a.slice( 1 )];
  });
};
