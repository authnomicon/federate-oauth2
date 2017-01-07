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
  
  function authenticate(req, res, next) {
    authenticator.authenticate(req.locals.provider, { session: false, failWithError: true })(req, res, next);
  }


  return [
    // FIXME: The following invalid, required state name causes an incorrect error in flowstate
    //ceremony.loadState({ name: 'sso/oauth2x', required: true }),
    ceremony.loadState({ name: 'sso/oauth2', required: true }),
    initialize,
    loadProvider,
    authenticate,
    // TODO: Link account to existing session, if any
    ceremony.complete('sso/oauth2'),
    ceremony.completeError('sso/oauth2')
  ];
  
};

exports['@require'] = [
  'http://schemas.authnomicon.org/js/sso/oauth2/createProvider',
  'http://i.bixbyjs.org/www/ceremony/Dispatcher',
  'http://i.bixbyjs.org/http/Authenticator'
];
