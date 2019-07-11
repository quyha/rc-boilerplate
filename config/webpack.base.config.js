const webpack = require('webpack');
const globImporter = require('node-sass-glob-importer');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const ifProd = x => !process.env.NODE_ENV !== 'production' && x;

const config = {
    entry: [
        "./src/index.jsx"
    ],
    output: {
    //     path: __dirname + '/dist',
    //     publicPath: '/',
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: [ '.js', '.jsx' ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        options: process.env.NODE_ENV === 'development' ? {} : {
                            reloadAll: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: process.env.NODE_ENV === 'development',
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development',
                            importer: globImporter(),
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: "file-loader",
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                }
            }
        ]
    },
    devtool: false,
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new CopyWebpackPlugin([
            { from: './src/public/assets', to: './assets' }
        ]),
        new FlowBabelWebpackPlugin(),
    ]
};

ifProd(config.plugins.push(
   new webpack.SourceMapDevToolPlugin({
       noSources: true,
   })
));

module.exports = config;
