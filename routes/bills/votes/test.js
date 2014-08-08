require( '../single-endpoint-test' )({
  nockRoot: 'https://congress.api.sunlightfoundation.com',
  nockPath: '/votes/?bill_id=hr2397-113&apikey=test&bill_id=hr2397-113',
  appPath: '/bills/:id/votes'
});


