export interface IKeyPair {
    publicKey: string;
    privateKey: string;
}

export interface IWallet {
    mnemonic: string;
    type: string;
    address: string;
    derivationPath?: string;
    keyPair: IKeyPair;
}

export type WalletType = 'bitcoin' | 'ethereum' | 'eos' | 'tron';
