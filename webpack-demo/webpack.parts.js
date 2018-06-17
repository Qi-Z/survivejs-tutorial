// Syntax you might not be familiar with
/*
1. exports.devServer
It is the module system of Node
We can import this file using:
`import {devServer} from 'webpack.parts.js'`

2. ({host, port}) => ({})
Arrow function that return an object. When we write webpack.parts.js, each export should return a webpack configuration object.
Equivalent to ({host, port}) => {return {};}

{host, port} is destructuring argument list

3. 
*/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "normal",
    host, // Defaults to localhost
    port, // Defaults to 8080,
    open: true,
    overlay: true
  }
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    // Define how we treat the module. Webpack support several module like ES2015 import, require, @import, url() etc
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        // use is alias to loaders
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
});

exports.extractCSS = ({include, exclude, use = []}) => {
    // Output extracted CSS to a file
    const plugin = new MiniCssExtractPlugin({
        filename: "[name]-[id].[chunkhash:10].[contenthash].css" // name is a placeholder to where the css is referred. we can also use hashing
    });

    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include,
                    exclude,
                    use: [
                        MiniCssExtractPlugin.loader
                    ].concat(use)
                }
            ]
        },
        plugins: [plugin]
    }
}
