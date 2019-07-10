import { IWallet } from './wallet';

export interface IPlugin {
    createWalletByMnemonic(mnemonic: string): IWallet;
    generateWallet(): IWallet;
    signTransaction(...args): any;
    createDeterministicWallets(...args): IWallet[];
}
