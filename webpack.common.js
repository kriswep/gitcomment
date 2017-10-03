const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    app: './src/index.js',
  },
  plugins: [new CleanWebpackPlugin(['dist'])],
  output: {
    filename: 'gitcomment.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'Gitcomment',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'prop-types',
      root: 'Prop-types',
    },
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
};
if (process.env.ANALYZE) {
  console.log('Analyze');
  config.plugins.push(new BundleAnalyzerPlugin());
} else {
  console.log('no analyze');
}

module.exports = config;
