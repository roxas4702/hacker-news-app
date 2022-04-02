const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js)$/,
                use: 'babel-loader',
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
    })],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

    devServer: {
        static: "./dist",
        port: 3000,
        open: true,
        hot: true
    },
};