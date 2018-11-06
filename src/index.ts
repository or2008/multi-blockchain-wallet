import bip39 from 'bip39';

// generate()

// https://www.npmjs.com/package/ethereumjs-wallet
// ethereum.generate()
// ethereum.fromV3()
// ethereum.fromPrivateKey()

// eos.generate()
// tron.generate()


interface IWallet {
    getPrivateKey: () => string;
    getPublicKey: () => string;
};

export function generateMnemonic() {

}

export function generateEthereumWallet(): IWallet {
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeed(mnemonic);

    return {
        getPublicKey: () => { return seed },
        getPrivateKey: () => { return seed }
    };
}

export function generate(type = 'ethereum') {

    if (type == 'ethereum')
        return generateEthereumWallet();
}


// multiBlockchainWallet.generate();

// multiBlockchainWallet.eos.generate();
// multiBlockchainWallet.tron.generate();
// multiBlockchainWallet.ethereum.generate();

// const seed = bip39.mnemonicToSeed(mnemonic);
// const hdKey = hdkey.fromMasterSeed(seed);
// const derivedHdKey = hdKey.derivePath("m/44'/60'/0'/0").deriveChild(0);
// const wallet = derivedHdKey.getWallet();

