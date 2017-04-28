/*
exports = module.exports = {
  'createprovider': require('./createprovider'),
  'statestore': require('./statestore')
};
*/

exports = module.exports = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
