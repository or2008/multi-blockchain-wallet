import * as bip39 from 'bip39';
import * as hdkey from 'hdkey';
import * as ecc from 'eosjs-ecc';
import * as wif from 'wif';
import { IKeyPair, IWallet } from '../common/wallet';

export function getKeyPairBySeed(seed): IKeyPair {
    const master = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))
    const node = master.derive("m/44'/194'/0'/0").deriveChild(0);

    const keyPair: IKeyPair = {
        publicKey: ecc.PublicKey(node._publicKey).toString(),
        privateKey: wif.encode(128, node._privateKey, false)
    };

    return keyPair;
}

export function generateWallet(): IWallet {
    const mnemonic = bip39.generateMnemonic()

    const seed = bip39.mnemonicToSeed(mnemonic);
    const keyPair = getKeyPairBySeed(seed);

    return {
        type: 'eos',
        address: '',
        keyPair: keyPair
    };
}
