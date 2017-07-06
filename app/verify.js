exports = module.exports = function() {
  
  return function verify(accessToken, refreshToken, params, profile, cb) {
    // TODO: Remove provider from profile
    // TODO: Indicate issuer in some normalized way.
    
    cb(null, profile);
  };
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/sso/oauth2/verifyFunc';
exports['@singleton'] = true;
exports['@require'] = [];
