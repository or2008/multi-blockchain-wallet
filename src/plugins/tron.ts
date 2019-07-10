import * as bip39 from 'bip39';
import { bip32 } from 'bitcoinjs-lib';
import { IWallet } from '../common/wallet';
import { address } from 'tronweb';

import { IPlugin } from '../common/plugin';

export interface ITronPlugin extends IPlugin {
    //
}

export const plugin: ITronPlugin = {
    createWalletByMnemonic(mnemonic) {
        const seed = bip39.mnemonicToSeed(mnemonic);
        const master = bip32.fromSeed(seed);

        const derived = master.derivePath("m/44'/195'/0'/0/0");

        const privateKey = derived.privateKey.toString('hex');
        const publicKey = address.fromPrivateKey(privateKey); // TODO - we use a big library just for this line, we should remove the lib

        return {
            type: 'tron',
            mnemonic: mnemonic,
            address: publicKey,
            keyPair: {
                publicKey: publicKey,
                privateKey: privateKey
            }
        };
    },

    createDeterministicWallets(): IWallet[] {
        // TBD
        return [];
    },

    generateWallet(): IWallet {
        const mnemonic = bip39.generateMnemonic();
        return plugin.createWalletByMnemonic(mnemonic);
    },

    signTransaction(rawTransactions, privateKey) {
        console.log('TODO', rawTransactions, privateKey);
        return '';
    }
};
