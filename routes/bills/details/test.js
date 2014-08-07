require( '../single-endpoint-test' )({
  nockRoot: 'http://api.nytimes.com',
  nockPath: '/svc/politics/v3/us/legislative/congress/113/bills/HR2397.json?api-key=test',
  appPath: '/bills/:id'
});
