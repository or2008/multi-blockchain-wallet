import { IWallet } from './common/wallet';
import { getPluginByType } from './plugins';
import { generateMnemonic } from 'bip39';

const DEFAULT_TYPES = ['bitcoin', 'ethereum', 'eos', 'tron'];

export { generateMnemonic, validateMnemonic } from 'bip39';

export function generate(type): IWallet {
    return getPluginByType(type).generateWallet();
}

export function generateMulti(types = DEFAULT_TYPES): IWallet[] {
    const mnemonic = generateMnemonic();
    return types.map(type => createWalletByMnemonic(mnemonic, type));
}

export function createWalletByMnemonic(mnemonic: string, type: string): IWallet {
    return getPluginByType(type).createWalletByMnemonic(mnemonic);
}

export function createWalletByMnemonicMulti(mnemonic: string, types = DEFAULT_TYPES): IWallet[] {
    return types.map(type => createWalletByMnemonic(mnemonic, type));
}

export function signTransaction(type, ...args) {
    return getPluginByType(type).signTransaction(...args);
}
