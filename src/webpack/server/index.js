const { env } = require('../configuration');

module.exports =
  env.NODE_ENV === 'production'
    ? require('./production')
    : require('./development');
