module.exports = {
  test: /\.js$/,

  // The path will follow symbolic link,
  // so packages in yarn workspaces will still get transpiled (as expected)
  exclude: /node_modules/,

  loader: require.resolve('babel-loader'),
  options: {
    presets: [require.resolve('babel-preset-swiftcarrot')],
    cacheDirectory: true,
  },
};
