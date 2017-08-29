const path                      = require('path');

/**
 * Create a HTML file using the HtmlWebpackPlugin
 */
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const HtmlWebpackPluginConfig   = new HtmlWebpackPlugin({
  // Use the index.html file in client as a template
  template: './client/index.html',
  /**
   * Output a index.html file. This will be outputted
   * to the dist folder as specified in the output
   * configuration object (path)
   */
  filename: 'index.html',
  // Inject the resources at the bottom of the body element
  inject: 'body'
})

module.exports = {
  // Entry point of the bundle process
  entry: ['./client/index.js'],
  output: {
    /**
     * The output files will be put in a 'dist' folder
     */
    path: path.resolve('dist'),
    /**
     * Name of the file webpack will build. This file
     * will be /dist/index_bundle.js
     */ 
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        // Run files with a '.js' extension through this loader
        test: /\.js$/,
        // Name of the loader we're going to use
        loader: 'babel-loader',
        // Ignore node_modules folder
        exclude: /node_modules/
      },
      {
        // Run files with a '.jsx' extension through this loader
        test: /\.jsx$/,
        // Name of the loader we're going to use
        loader: 'babel-loader',
        // Ignore node_modules folder
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}