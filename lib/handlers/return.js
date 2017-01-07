exports = module.exports = function(createProvider, ceremony, authenticator) {

  function initialize(req, res, next) {
    req.locals = req.locals || {};
    next();
  }

  function loadProvider(req, res, next) {
    createProvider(req.state, function(err, provider) {
      if (err) { return next(err); }
      req.locals.provider = provider;
      next();
    });
  }



  return [
    // FIXME: The following invalid, required state name causes an incorrect error in flowstate
    //ceremony.loadState({ name: 'sso/oauth2x', required: true }),
    ceremony.loadState({ name: 'sso/oauth2', required: true }),
    initialize,
    loadProvider,
    function authenticate(req, res, next) {
      console.log('AUTHENTICATE!');
      console.log(req.locals);
      
      next();
    },
    // NOTE: Running without sessions causes a new login prompt and new oath transaction.  why isn't it the same?
    //authenticator.authenticate('google.com', { session: false, failWithError: true }),
    // TODO: Disable session and localize account
    authenticator.authenticate('google.com', { session: true, failWithError: true }),
    function errLogger(err, req, res, next) {
      console.log(err);
      console.log(err.stack);
      next(err);
    },
    ceremony.complete('sso/oauth2'),
    ceremony.completeError('sso/oauth2')
  ];
  
};

exports['@require'] = [
  'http://schemas.authnomicon.org/js/sso/oauth2/createProvider',
  'http://i.bixbyjs.org/www/ceremony/Dispatcher',
  'http://i.bixbyjs.org/http/Authenticator'
];
