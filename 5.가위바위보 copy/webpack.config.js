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
        },
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        }
    ]
    },
    plugins : [
        new VueLoaderPlugin(),
    ],
    output : {
        filename: '[name].js', //app.js
        path: path.join(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // 정적 파일을 서빙할 경로 설정
        },
        compress: true, // 압축 활성화
        port: 8080, // 포트 설정
        historyApiFallback: true, // Vue Router history 모드 지원
    }
}