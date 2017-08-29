const path = require('path');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  devtool: production ? false : 'eval-source-map',
  output: {
    filename: 'gitcomment.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'gitcomment',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'react',
    },
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
};
