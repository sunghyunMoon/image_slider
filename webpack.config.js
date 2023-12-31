const path = require("path");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./docs"),
        clean: true
    },
    devtool: "source-map",
    mode: "development",
    devServer: {
        host: "localhost",
        port: 8080,
        open: true,
        watchFiles: 'index.html'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "Image Slider",
            template: "./index.html",
            inject: "body",
            favicon: "./favicon.PNG"
        }),
        new MiniCssExtractPlugin({
            filename:"style.css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.jpeg$/,
                type: 'asset/inline'
            },
        ]
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()
        ]
    }
}