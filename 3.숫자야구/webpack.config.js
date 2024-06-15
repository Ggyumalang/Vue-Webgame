//node 에서 제공해주는 path.. 현재 경로를 알 수 있음 __dirname 은 현재 경로를 의미함.
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
    mode:'development',
    devtool: 'eval',
    resolve : {
        extensions : ['.js', '.vue'],
    },
    entry : {
        app: path.join(__dirname,'main.js')
    },
    //webpack 의 핵심
    module : {
        rules : [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }]
    },
    plugins : [
        new VueLoaderPlugin(),
    ],
    output : {
        filename: '[name].js', //app.js
        path: path.join(__dirname, 'dist')
    }
}