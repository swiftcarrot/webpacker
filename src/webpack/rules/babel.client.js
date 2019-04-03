module.exports = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: require.resolve('babel-loader'),
  options: {
    presets: [require.resolve('../babel-preset-zkit')],
    cacheDirectory: true
  }
};
