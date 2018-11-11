import { IWallet } from './common/wallet';
import * as bitcoinPlugin from './plugins/bitcoin';
import * as ethereumPlugin from './plugins/ethereum';
import * as eosPlugin from './plugins/eos';
import * as tronPlugin from './plugins/tron';
import * as bip39 from 'bip39';

export function generate(type = 'eos'): IWallet {
    if (type == 'bitcoin')
        return bitcoinPlugin.generateWallet();
    if (type == 'ethereum')
        return ethereumPlugin.generateWallet();
    if (type == 'eos')
        return eosPlugin.generateWallet();
    if (type == 'tron')
        return tronPlugin.generateWallet();

    return ethereumPlugin.generateWallet();
}

export function createWalletByMnemonic(type, mnemonic): IWallet {
    if (type == 'bitcoin')
        return bitcoinPlugin.createWalletByMnemonic(mnemonic);
    if (type == 'ethereum')
        return ethereumPlugin.createWalletByMnemonic(mnemonic);
    if (type == 'eos')
        return eosPlugin.createWalletByMnemonic(mnemonic);
    if (type == 'tron')
        return tronPlugin.createWalletByMnemonic(mnemonic);

    return bitcoinPlugin.createWalletByMnemonic(mnemonic);
}

export function generateMulti(types = ['bitcoin', 'ethereum', 'eos', 'tron']): IWallet[] {
    const mnemonic = bip39.generateMnemonic();
    return types.map(type => createWalletByMnemonic(type, mnemonic));
}
