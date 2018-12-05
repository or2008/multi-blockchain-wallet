import * as bip39 from 'bip39';
import { networks, payments, bip32, ECPair } from 'bitcoinjs-lib';

import { IWallet } from '../common/wallet';
import { IPlugin } from '../common/plugin';

function getAddressFromNode(node) {
    return payments.p2pkh({ pubkey: node.publicKey, network: networks.bitcoin }).address;
}

export const plugin: IPlugin = {
    createWalletByMnemonic(mnemonic) {
        const seed = bip39.mnemonicToSeed(mnemonic);
        const master = bip32.fromSeed(seed);

        const derived = master.derivePath("m/44'/0'/0'/0/0");

        return {
            type: 'bitcoin',
            mnemonic: mnemonic,
            address: getAddressFromNode(derived),
            keyPair: {
                publicKey: derived.publicKey.toString('hex'),
                privateKey: ECPair.fromPrivateKey(derived.privateKey).toWIF()
            }
        };
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
