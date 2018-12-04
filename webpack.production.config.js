const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    output: {
        library: 'MultiBlockchainWallet',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                include: [
                    path.resolve(__dirname, './src'),
                    path.resolve(__dirname, './config.js'),
                    path.join(__dirname, 'node_modules', 'bitcoinjs-lib'),
                    path.join(__dirname, 'node_modules', 'tiny-secp256k1'),
                    path.join(__dirname, 'node_modules', 'bip32'),
                    path.join(__dirname, 'node_modules', 'typeforce'),
                    path.join(__dirname, 'node_modules', 'eosjs-ecc'),
                    path.join(__dirname, 'node_modules', 'eosjs'),
                    path.join(__dirname, 'node_modules', 'base-x')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-typescript']
                }
            }
        ]
    }
};
