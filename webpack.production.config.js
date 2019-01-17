const path = require('path');

const common = {
    entry: './src/index.ts',
    mode: 'production',

    optimization: {
        minimize: false
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.node$/,
                use: 'node-loader'
            },
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
                    path.join(__dirname, 'node_modules', 'base-x'),
                    path.join(__dirname, 'node_modules', 'ethereumjs-wallet'),
                    path.join(__dirname, 'node_modules', 'ethereumjs-tx'),
                    path.join(__dirname, 'node_modules', 'ethereumjs-util'),
                    path.join(__dirname, 'node_modules', 'rlp')
                ],
                loader: 'babel-loader'
            }
        ]
    }
};

const serverConfig = {
    target: 'node',
    output: {
        library: 'MultiBlockchainWallet',
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.node.js',
        globalObject: 'typeof self !== \'undefined\' ? self : this' // TODO - remove when its fixed, https://github.com/webpack/webpack/issues/6784
    },

    ...common
};

const clientConfig = {
    target: 'web', // <=== can be omitted as default is 'web'
    output: {
        library: 'MultiBlockchainWallet',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },

    ...common
};

module.exports = [clientConfig, serverConfig];
