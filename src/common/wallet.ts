export interface IKeyPair {
    publicKey: string,
    privateKey: string
};

export interface IWallet {
    type: string,
    address: string,
    keyPair: IKeyPair
};