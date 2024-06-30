const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: './dist',
                },
            },
        ],
    },
    plugins: [
        
         new FileManagerPlugin({
               events: {
                         onStart: {
                               delete: ['dist'],
                             },
                     onEnd: {
               copy: [
                     {
                       source: path.join('public'),
                       destination: 'dist',
                     },
               ],
         },
       },
     }),

],
   
    
};
