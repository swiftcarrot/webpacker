# webpacker

[![npm](https://img.shields.io/npm/v/@swiftcarrot/webpacker.svg)](https://www.npmjs.com/package/@swiftcarrot/webpacker)
[![npm](https://img.shields.io/npm/dm/@swiftcarrot/webpacker.svg)](https://www.npmjs.com/package/@swiftcarrot/webpacker)
[![Build Status](https://travis-ci.org/swiftcarrot/webpacker.svg?branch=master)](https://travis-ci.org/swiftcarrot/webpacker)
[![codecov](https://codecov.io/gh/swiftcarrot/webpacker/branch/master/graph/badge.svg)](https://codecov.io/gh/swiftcarrot/webpacker)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

### Install

```sh
npm install @swiftcarrot/webpacker --save-dev
yarn add @swiftcarrot/webpacker --dev
```

### Usage

```sh
webpacker serve -l http://localhost:5000
webpacker watch
webpacker build
webpacker analyze
```

### Features

- multiple entries support (`packs/*.js`)
- zero config
  - `.js` with [babel-preset-swiftcarrot](https://github.com/swiftcarrot/babel-preset-swiftcarrot)
  - `.css`
  - `.module.css` css module
  - `.(scss|sass)` with [sass-loader](https://github.com/webpack-contrib/sass-loader)
  - `.module.(scss|sass)` css module with sass
  - `.yaml` with [@swiftcarrot/yaml-loader](https://github.com/swiftcarrot/yaml-loader)
  - `.toml` with [toml-laoder](https://github.com/KyleAMathews/toml-loader)
  - `.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)` with [file-loader](https://github.com/webpack-contrib/file-loader)
  - `icons/*.svg` with [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack)

### License

MIT
