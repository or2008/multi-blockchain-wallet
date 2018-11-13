import { IWallet } from './common/wallet';
import { getPluginByType } from './plugins';
import * as bip39 from 'bip39';

// const DEFAULT_TYPES = ['bitcoin', 'ethereum', 'eos', 'tron'];

export function generateMnemonic(strength?, rng?, wordlist?) {
    return bip39.generateMnemonic(strength, rng, wordlist);
}

export function generate(type = 'ethereum'): IWallet {
    return getPluginByType(type).generateWallet();
}

export function generateMulti(types): IWallet[] {
    const mnemonic = generateMnemonic();
    return types.map(type => createWalletByMnemonic(type, mnemonic));
}

export function createWalletByMnemonic(type: string, mnemonic: string): IWallet {
    return getPluginByType(type).createWalletByMnemonic(mnemonic)
}

export function createWalletByMnemonicMulti(types, mnemonic): IWallet[] {
    return types.map(type => createWalletByMnemonic(type, mnemonic));
}
