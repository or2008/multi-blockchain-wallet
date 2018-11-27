import { IWallet } from './wallet';

export interface IPlugin {
    createWalletByMnemonic(mnemonic: string): IWallet;
    generateWallet(): IWallet,
    signRawTransaction(...args): any;
}
