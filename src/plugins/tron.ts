import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import { IWallet } from '../common/wallet';
import * as TronWeb from 'tronweb';

export function createWalletByMnemonic(mnemonic: string): IWallet {
    const seed = bip39.mnemonicToSeed(mnemonic);
    const master = bitcoin.bip32.fromSeed(seed);

    const derived = master.derivePath("m/44'/195'/0'/0/0");

    const privateKey = derived.privateKey.toString('hex');
    const publicKey = TronWeb.address.fromPrivateKey(privateKey); // TODO - we use a big library just for this line, we should remove the lib

    return {
        type: 'tron',
        mnemonic: mnemonic,
        address: publicKey,
        keyPair: {
            publicKey: publicKey,
            privateKey: privateKey
        }
    };
}

export function generateWallet(): IWallet {
    const mnemonic = bip39.generateMnemonic();
    return createWalletByMnemonic(mnemonic);
}
