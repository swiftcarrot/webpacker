module.exports = {
  webpack: (config, options, webpack) => {
    config.module.rules.push({
      test: /\.pug$/,
      loader: 'pug-loader'
    });

    return config;
  }
};
