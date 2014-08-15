var buildMeta = function( object, existing ) {
  var metaObject = existing ? existing : {};
  var obj, keys, i;
  object = JSON.parse( object );
  if (object.results && object.results[0] && object.results.length === 1){
    obj = object.results[0];
    keys = [
      'congress',
      'bill',
      'title',
      'sponsor',
      'sponsor_id',
      'introduction_date',
      'committees',
      'house_passage_vote',
      'senate_passage_vote'
    ];
    for (i = 0; i < keys.length; i++){
      if (!metaObject[keys[i]]) {
        metaObject[keys[i]] = obj[keys[i]];
      }
    }
    return metaObject;
  }
};

module.exports = buildMeta;

// usage
// var newPing = blah
// var redisPing = blahBlahBlah
// buildMeta( newPing, redisPing )
// probably shouldn't do this until newPing comes in
