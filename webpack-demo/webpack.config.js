const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.parts');
const glob = require('glob');

const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo'
            })
        ]
    },
    {
        entry: {
            main: './src/index.js',
            style: [ // `style` is the entry chunk name
                ...glob.sync('./src/**/*.scss') // If a "globstar" is alone in a path portion, then it matches zero or more directories and subdirectories searching for matches. It does not crawl symlinked directories.
            ]
        }
    }
])

const productionConfig = merge([
    // parts.extractCSS({
    //     use: ['css-loader', 'sass-loader']
    // })
    parts.loadCSS()
]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
    }),
    parts.loadCSS()
])

module.exports = (mode) => {
    if(mode === 'production') {
        return merge(commonConfig, productionConfig, {mode});
    }
    return merge(commonConfig, developmentConfig, {mode});
}


// module.exports = {
//     devServer: {
//         // Display only errors to reduce the amount of ouput
//         stats: 'errors-only',
//         // Parse host and port from env to allow customization.
//         //
//         // If you use Docker, Vagrant or Cloud9, set
//         // host: options.host || "0.0.0.0";
//         //
//         // 0.0.0.0 is available to all network devices
//         // unlike default `localhost`.
//         host: process.env.HOST,
//         port: process.env.PORT,
//         open: true, // open the page in browser
//         overlay: true,
//         watchOptions: {
//             // Delay the rebuild after the first change
//             aggregateTimeout: 300,

//             // Poll using interval (in ms, accepts boolean too)
//             poll: 1000,
//         },
//         // contentBase: "src"
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             title: 'Webpack demo'
//         }),
//         // Ignore node_modules so CPU usage with poll
//         // Watching drops significantly
//         new webpack.WatchIgnorePlugin([
//             path.join(__dirname, 'node_modules')
//         ])
//     ]
// }