import { mnemonicToSeed, generateMnemonic } from 'bip39';
import * as hdkey from 'ethereumjs-wallet/hdkey';

import * as EthereumWallet from 'ethereumjs-wallet';
import * as EthereumTx from 'ethereumjs-tx';
import * as EthereumUtil from 'ethereumjs-util';

import { IWallet } from '../common/wallet';
import { IPlugin } from '../common/plugin';

export interface IEthereumTransaction {
    transaction: object
}

export interface IEthereumPlugin extends IPlugin {
    fromEthSale(walletInstance, password): any;
    fromV1(walletInstance, password): any;
    fromV3(walletInstance, password): any;
    toV3(walletInstance): any;
}

export const plugin: IEthereumPlugin = {
    createWalletByMnemonic(mnemonic) {
        const seed = mnemonicToSeed(mnemonic);
        const hdKey = hdkey.fromMasterSeed(seed);
        const derivedHdKey = hdKey.derivePath("m/44'/60'/0'/0").deriveChild(0);
        const wallet = derivedHdKey.getWallet();

        return {
            type: 'ethereum',
            mnemonic: mnemonic,
            address: wallet.getAddressString(),
            keyPair: {
                publicKey: wallet.getPublicKeyString(),
                privateKey: wallet.getPrivateKeyString()
            }
        };
    },

    generateWallet(): IWallet {
        const mnemonic = generateMnemonic();
        return plugin.createWalletByMnemonic(mnemonic);
    },

    signTransaction(ethereumTransaction: IEthereumTransaction, privateKey: string) {
        const bufferPrivateKey = EthereumUtil.toBuffer(privateKey);

        const rawTransaction = ethereumTransaction.transaction ? ethereumTransaction.transaction : ethereumTransaction;

        const ethereumTx = new EthereumTx(rawTransaction);
        ethereumTx.sign(bufferPrivateKey);

        const serializedTransaction = ethereumTx.serialize();
        const ethereumTxData = serializedTransaction.toString('hex');
        return EthereumUtil.addHexPrefix(ethereumTxData);
    },

    fromEthSale(...args) {
        return EthereumWallet.fromEthSale(...args);
    },

    fromV1(...args) {
        return EthereumWallet.fromV1(...args);
    },

    fromV3(...args) {
        return EthereumWallet.fromV3(...args);
    },

    toV3(...args) {
        return EthereumWallet.toV3(...args);
    }
};
