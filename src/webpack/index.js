const { isProd } = require('../utils');

module.exports = isProd() ? require('./production') : require('./development');
