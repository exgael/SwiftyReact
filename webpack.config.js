import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
  entry: './src/index.js', // main entry point of your component library
  mode: 'production', // Set the mode to production
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    libraryTarget: 'umd', // This will make it compatible with both CommonJS and ES modules
  },
  externals: [nodeExternals()], // Exclude React and ReactDOM from the bundle
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Check for .js or .jsx files
        exclude: /node_modules/, // Don't transpile node_modules
        use: {
          loader: 'esbuild-loader', // No Babel, but using ESBuild for fast builds
          options: {
            loader: 'jsx', // Load JSX files
            target: 'es2015', // Target modern JavaScript (ES6+)
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
};
