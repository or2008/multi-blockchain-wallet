import { IWallet } from './common/wallet';
import { plugins } from './plugins';
import * as bip39 from 'bip39';

export function generate(type = 'eos'): IWallet {
    return plugins[type].generateWallet();
}

export function createWalletByMnemonic(type, mnemonic): IWallet {
    return plugins[type].createWalletByMnemonic(mnemonic);
}

export function generateMulti(types = ['bitcoin', 'ethereum', 'eos', 'tron']): IWallet[] {
    const mnemonic = bip39.generateMnemonic();
    return types.map(type => createWalletByMnemonic(type, mnemonic));
}
