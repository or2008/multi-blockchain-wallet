import { IWallet } from './common/wallet';
import { getPluginByType } from './plugins';
import * as bip39 from 'bip39';

export function generate(type = 'eos'): IWallet {
    return getPluginByType(type).generateWallet();
}

export function createWalletByMnemonic(type, mnemonic): IWallet {
    return getPluginByType(type).createWalletByMnemonic(mnemonic)
}

export function generateMulti(types = ['bitcoin', 'ethereum', 'eos', 'tron']): IWallet[] {
    const mnemonic = bip39.generateMnemonic();
    return types.map(type => createWalletByMnemonic(type, mnemonic));
}
