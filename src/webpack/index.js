const { getEnv } = require('../utils');

module.exports =
  getEnv() === 'production'
    ? require('./production')
    : require('./development');
