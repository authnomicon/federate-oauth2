exports = module.exports = function(container) {
  return container.create('./createprovider/used');
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/sso/oauth2/createProvider';
exports['@singleton'] = true;
exports['@require'] = [ '!container' ];
