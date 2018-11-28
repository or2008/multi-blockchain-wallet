import * as bip39 from 'bip39';
import * as hdkey from 'hdkey';
import * as ecc from 'eosjs-ecc';
import * as wif from 'wif';
import { IKeyPair, IWallet } from '../common/wallet';
import { IPlugin } from '../common/plugin';
// import * as Eos from 'eosjs';
const Eos = require('eosjs');

function getKeyPairBySeed(seed): IKeyPair {
    const master = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'));
    const node = master.derive("m/44'/194'/0'/0").deriveChild(0);

    const keyPair: IKeyPair = {
        publicKey: ecc.PublicKey(node._publicKey).toString(), // eslint-disable-line new-cap
        privateKey: wif.encode(128, node._privateKey, false)
    };

    return keyPair;
}

function getEosIntance(config) {
    return new Eos(config);
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

    signRawTransaction(rawTransaction, eosConfig) {
        const eos = getEosIntance(eosConfig);
        return eos.transaction(rawTransaction);
    }
};
