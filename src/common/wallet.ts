export interface IKeyPair {
    publicKey: string,
    privateKey: string
};

export interface IWallet {
    mnemonic: string,
    type: string,
    address: string,
    keyPair: IKeyPair
};