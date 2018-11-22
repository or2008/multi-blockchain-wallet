import { IWallet } from './common/wallet';
import { getPluginByType } from './plugins';
import * as bip39 from 'bip39';

const DEFAULT_TYPES = ['bitcoin', 'ethereum', 'eos', 'tron'];

export function generateMnemonic(strength?, rng?, wordlist?) {
    return bip39.generateMnemonic(strength, rng, wordlist);
}

export function validateMnemonic(mnemonic): boolean {
    return bip39.validateMnemonic(mnemonic);
}

export function generate(type = 'ethereum'): IWallet {
    return getPluginByType(type).generateWallet();
}

export function generateMulti(types = DEFAULT_TYPES): IWallet[] {
    const mnemonic = generateMnemonic();
    return types.map(type => createWalletByMnemonic(mnemonic, type));
}

export function createWalletByMnemonic(mnemonic: string, type: string): IWallet {
    return getPluginByType(type).createWalletByMnemonic(mnemonic)
}

export function createWalletByMnemonicMulti(mnemonic: string, types = DEFAULT_TYPES): IWallet[] {
    return types.map(type => createWalletByMnemonic(mnemonic, type));
}
