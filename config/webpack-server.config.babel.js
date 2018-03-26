import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';

export default {
    profile: true,
    target: 'node',
    context: path.join(__dirname, '..'),
    devtool: 'source-map',
    node: {
        __filename: false,
        __dirname: false
    },
    entry: {
        polyfill: ['babel-core/register', 'babel-polyfill'],
        server: path.join(__dirname, '..', 'www', 'app.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '..', 'dist', 'www')
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.ejs$/,
                exclude: /node_modules/,
                use: ['ejs-compiled-loader?compileDebug&name=[name].[ext]']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/www']),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
};