import { IWallet, WalletType } from './common/wallet';
import { getPluginByType } from './plugins';
import { generateMnemonic } from 'bip39';
import { IPlugin } from './common/plugin';

const DEFAULT_TYPES: WalletType[] = ['bitcoin', 'ethereum', 'eos', 'tron'];

export { generateMnemonic, validateMnemonic } from 'bip39';

export function generate(type): IWallet {
    return getPluginByType(type).generateWallet();
}

export function createWalletByMnemonic(mnemonic: string, type: WalletType): IWallet {
    return getPluginByType(type).createWalletByMnemonic(mnemonic);
}

export function generateMulti(types: WalletType[] = DEFAULT_TYPES): IWallet[] {
    const mnemonic = generateMnemonic();
    return types.map(type => createWalletByMnemonic(mnemonic, type));
}

export function createDeterministicWallets(type: WalletType, mnemonic: string, derivationPath: string, limit: number = 0, offset: number = 20): IWallet[] {
    return getPluginByType(type).createDeterministicWallets(mnemonic, derivationPath, limit, offset);
}

export function createWalletByMnemonicMulti(mnemonic: string, types: WalletType[] = DEFAULT_TYPES): IWallet[] {
    return types.map(type => createWalletByMnemonic(mnemonic, type));
}

export function signTransaction(type, ...args) {
    return getPluginByType(type).signTransaction(...args);
}

export function getWalletApiByType<T extends IPlugin>(type) {
    return getPluginByType<T>(type) as T;
}
