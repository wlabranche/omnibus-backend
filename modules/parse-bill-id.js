'use strict';

var isNumber = RegExp.prototype.test.bind( /^[0-9]+$/ );
var isLetter = RegExp.prototype.test.bind( /^[a-zA-Z]+$/ );

function Bill ( id ) {
  var _id = id.toLowerCase().split( '-' );
  this.congressNumber = _id[0];
  this.billNumber = _id[1].split( '' ).filter( isNumber ).join( '' );
  this.billType = _id[1].split( '' ).filter( isLetter ).join( '' ).toLowerCase();
  this.sunlightId = _id[1] + '-' + _id[0];
}

module.exports = function ( id ) {
  return new Bill( id );
};
