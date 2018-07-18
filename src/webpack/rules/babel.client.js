module.exports = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: require.resolve('babel-loader'),
  options: {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          useBuiltIns: 'usage',
          modules: false
        }
      ],
      require.resolve('@babel/preset-flow'),
      require.resolve('@babel/preset-react')
    ],
    plugins: [
      require.resolve('@babel/plugin-transform-destructuring'),
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      require.resolve('@babel/plugin-syntax-dynamic-import')
    ],
    cacheDirectory: true
  }
};
