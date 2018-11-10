import * as bip39 from 'bip39';
import * as hdkey from 'hdkey';
import * as ecc from 'eosjs-ecc';
import * as wif from 'wif';
import { IWallet } from '../common/wallet';

export function createWalletByMnemonic(mnemonic: string): IWallet {
    const seed = bip39.mnemonicToSeed(mnemonic);
    const master = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))
    const node = master.derive("m/44'/194'/0'/0").deriveChild(0);

    return {
        type: 'tron',
        address: '',
        keyPair: {
            publicKey: ecc.PublicKey(node._publicKey).toString(),
            privateKey: wif.encode(128, node._privateKey, false)
        }
    };

}

export function generateWallet(): IWallet {
    const mnemonic = bip39.generateMnemonic()
    return createWalletByMnemonic(mnemonic);
}
