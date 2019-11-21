import * as bip39 from 'bip39';
import * as hdkey from 'hdkey';
import * as ecc from 'eosjs-ecc';
import * as wif from 'wif';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';

import { IKeyPair, IWallet } from '../common/wallet';
import { IPlugin } from '../common/plugin';
import { SignatureProvider } from 'eosjs/dist/eosjs-api-interfaces';

export interface IEosTransaction {
    chainId: string;
    transaction: object;
}

export function getKeyPairBySeed(seed): IKeyPair {
    const master = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'));
    const node = master.derive("m/44'/194'/0'/0").deriveChild(0);

    const keyPair: IKeyPair = {
        publicKey: ecc.PublicKey(node._publicKey).toString(), // eslint-disable-line new-cap
        privateKey: wif.encode(128, node._privateKey, false)
    };

    return keyPair;
}
export interface IEosPlugin extends IPlugin {
    signTransactionBySignatureProvider(...args): any;
}

export const plugin: IEosPlugin = {
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

    createDeterministicWallets(): IWallet[] {
        // TBD
        return [];
    },

    generateWallet(): IWallet {
        const mnemonic = bip39.generateMnemonic();
        return plugin.createWalletByMnemonic(mnemonic);
    },

    async signTransaction(eosTransaction: IEosTransaction, privateKey: string) {
        const signatureProvider = new JsSignatureProvider([privateKey]);
        return this.signTransactionBySignatureProvider(eosTransaction, signatureProvider);
    },

    async signTransactionBySignatureProvider(eosTransaction: IEosTransaction, signatureProvider: SignatureProvider) {
        const { chainId, transaction } = eosTransaction;
        const publicKeys = await signatureProvider.getAvailableKeys();

        const serializedTransactionUnit8Array = typeof transaction == 'object' ? new Uint8Array(Object.values(transaction)) : transaction;
        const signatures = await signatureProvider.sign({
            chainId,
            serializedTransaction: serializedTransactionUnit8Array,
            requiredKeys: publicKeys,
            abis: []
        });

        return {
            signatures,
            transaction: serializedTransactionUnit8Array
        };
    }
};
