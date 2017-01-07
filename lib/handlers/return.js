exports = module.exports = function(ceremony, authenticator) {

  return [
    ceremony.loadState('sso/oauth2'),
    // NOTE: Running without sessions causes a new login prompt and new oath transaction.  why isn't it the same?
    //authenticator.authenticate('google.com', { session: false, failWithError: true }),
    // TODO: Disable session and localize account
    authenticator.authenticate('google.com', { session: true, failWithError: true }),
    ceremony.complete('sso/oauth2'),
    ceremony.completeError('sso/oauth2')
  ];
  
};

exports['@require'] = [
  'http://i.bixbyjs.org/www/ceremony/Dispatcher',
  'http://i.bixbyjs.org/http/Authenticator'
];
