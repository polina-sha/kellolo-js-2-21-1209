const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports={
    output: {
        filename: "js/bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                use: ['file-loader']
            }
        ]

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './src/assets/imgs', to: 'img'
            },]
        })
    ]
}