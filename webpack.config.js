const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: isProduction ? 'bundle.min.js' : 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'source-map',
  optimization: {
    minimize: isProduction,
  },
}; 