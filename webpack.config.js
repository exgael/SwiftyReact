import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react'
            ]
          }
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};