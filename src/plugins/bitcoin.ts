const bip39 = require('bip39');
import * as bitcoin from 'bitcoinjs-lib';
import { IWallet } from '../common/wallet';
import { IPlugin } from '../common/plugin';

function getAddressFromNode(node) {
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network: bitcoin.networks.bitcoin }).address;
}

export const plugin: IPlugin = {
    createWalletByMnemonic(mnemonic) {
        const seed = bip39.mnemonicToSeed(mnemonic);
        const master = bitcoin.bip32.fromSeed(seed);

        const derived = master.derivePath("m/44'/0'/0'/0/0");

        return {
            type: 'bitcoin',
            mnemonic: mnemonic,
            address: getAddressFromNode(derived),
            keyPair: {
                publicKey: derived.publicKey.toString('hex'),
                privateKey: bitcoin.ECPair.fromPrivateKey(derived.privateKey).toWIF()
            }
        };
    },

    generateWallet(): IWallet {
        const mnemonic = bip39.generateMnemonic();
        return plugin.createWalletByMnemonic(mnemonic);
    },

    signRawTransaction(rawTransactions, privateKey) {
        console.log('TODO', rawTransactions, privateKey);
        return '';
    }
};
