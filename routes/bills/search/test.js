require( '../single-endpoint-test' )({
  nockRoot: 'https://congress.api.sunlightfoundation.com',
  nockPath: '/bills/search/?query=test&apikey=test&query=test',
  appPath: '/bills/search?q=test'
});
