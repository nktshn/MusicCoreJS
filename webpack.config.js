module.exports = {
    context: __dirname,
    entry: './index.js',
    mode: 'none',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
};