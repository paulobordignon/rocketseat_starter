module.exports = {
    entry: ['@babel/polyfill','./src/desafios.js'],
    output:{
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname + '/public',
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    },
};