const path = require('path');

module.exports = config => ({
  ...config,
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'components'),
      pages: path.resolve(__dirname, 'pages')
    }
  }
});
