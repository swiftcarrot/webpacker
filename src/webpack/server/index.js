const { env } = require('../configuration');

module.exports =
  env === 'production' ? require('./production') : require('./development');
