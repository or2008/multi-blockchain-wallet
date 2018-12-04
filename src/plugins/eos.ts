const bip39 = require('bip39');
const hdkey = require('hdkey');
const ecc = require('eosjs-ecc');
const wif = require('wif');
const { JsSignatureProvider } = require('eosjs');

import { IKeyPair, IWallet } from '../common/wallet';
import { IPlugin } from '../common/plugin';

export interface IEosTransaction {
    chainId: string,
    transaction: object
}

function getKeyPairBySeed(seed): IKeyPair {
    const master = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'));
    const node = master.derive("m/44'/194'/0'/0").deriveChild(0);

    const keyPair: IKeyPair = {
        publicKey: ecc.PublicKey(node._publicKey).toString(), // eslint-disable-line new-cap
        privateKey: wif.encode(128, node._privateKey, false)
    };

    return keyPair;
}

export const plugin: IPlugin = {
    createWalletByMnemonic(mnemonic) {
        const seed = bip39.mnemonicToSeed(mnemonic);
        const keyPair = getKeyPairBySeed(seed);

        return {
            type: 'eos',
            mnemonic: mnemonic,
            address: '',
            keyPair: keyPair
        };
    },

    generateWallet(): IWallet {
        const mnemonic = bip39.generateMnemonic();
        return plugin.createWalletByMnemonic(mnemonic);
    },

    async signTransaction(eosTransaction: IEosTransaction, privateKey: string) {
        const signatureProvider = new JsSignatureProvider([privateKey]);

        const { chainId, transaction } = eosTransaction;
        const publicKeys = await signatureProvider.getAvailableKeys();

        const serializedTransactionUnit8Array = typeof transaction == 'object' ? new Uint8Array(Object.values(transaction)) : transaction;
        const signatures = await signatureProvider.sign({
            chainId,
            serializedTransaction: serializedTransactionUnit8Array,
            requiredKeys: publicKeys
        });

        return signatures;
    }
};
