exports = module.exports = function(createProvider, ceremony, authenticator, loadState, authenticate) {

  function loadIdentityProvider(req, res, next) {
    createProvider(req.state, function(err, provider) {
      if (err) { return next(err); }
      req.locals.provider = provider;
      next();
    });
  }
  
  function authenticateAuthorizationResponse(req, res, next) {
    authenticator.authenticate(req.locals.provider, { session: false, failWithError: true })(req, res, next);
  }
  
  function stashAccount(req, res, next) {
    req.locals.account = req.user;
    delete req.user;
    next();
  }

  function postProcess(req, res, next) {
    // TODO Abstract this out into something common, shared between protocls
    // https://en.wikipedia.org/wiki/Federated_identity
    
    if (!req.user) {
      // TODO: Local account provisioning w/ initial linked account
    } else {
      // TODO: Account linking, storing access and refresh tokens, etc.
    }
    next();
  }


  return [
    // FIXME: The following invalid, required state name causes an incorrect error in flowstate
    //ceremony.loadState({ name: 'sso/oauth2x', required: true }),
    loadState('federate/oauth2', { required: true }),
    loadIdentityProvider,
    authenticateAuthorizationResponse,
    stashAccount,
    authenticate([ 'state', 'anonymous' ]),
    postProcess,
    // TODO: Link account to existing session, if any
    ceremony.complete('federate/oauth2'),
    ceremony.completeError('federate/oauth2')
  ];
  
};

exports['@require'] = [
  'http://schemas.authnomicon.org/js/sso/oauth2/createProvider',
  'http://i.bixbyjs.org/http/state/Dispatcher',
  'http://i.bixbyjs.org/http/Authenticator',
  'http://i.bixbyjs.org/http/middleware/loadState',
  'http://i.bixbyjs.org/http/middleware/authenticate'
];
