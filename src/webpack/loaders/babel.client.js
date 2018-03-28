module.exports = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: require.resolve('babel-loader'),
  options: {
    presets: [
      [
        require.resolve('babel-preset-env'),
        {
          modules: false,
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'IE 10'],
            uglify: true
          },
          useBuiltIns: true
        }
      ],
      require.resolve('babel-preset-react')
    ],
    plugins: [
      require.resolve('babel-plugin-syntax-dynamic-import'),
      require.resolve('babel-plugin-transform-object-rest-spread'),
      require.resolve('babel-plugin-transform-class-properties')
    ],
    cacheDirectory: true
  }
};
