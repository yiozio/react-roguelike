const path = require('path');

module.exports = {
    mode: 'development',
    entry: {rogue: './src/index.tsx'},
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: ['ts-loader']
        }]
    },
    devtool: 'source-map',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        path: path.resolve('./public/dist'),
        filename: '[name].js'
    },
    stats: {
        children: false
    }
}
