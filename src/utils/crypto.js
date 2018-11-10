import ecc from 'eosjs-ecc';
const { PrivateKey } = ecc;
import bip39 from 'bip39';

// import PluginRepository from '../plugins/PluginRepository';

export async function generatePrivateKey() {
    return (await PrivateKey.randomKey()).toBuffer();
}

    export bufferToPrivateKey(buffer, blockchain) {
    return PluginRepository.plugin(blockchain).bufferToHexPrivate(buffer);
}

    export privateKeyToBuffer(privateKey, blockchain) {
    return PluginRepository.plugin(blockchain).hexPrivateToBuffer(privateKey);
}

    export bufferToHash(buffer) {
    return ecc.sha256(buffer);
}


// EOS

// Could use this one for EOS keys?

// const hdkey = require('hdkey')
// const wif = require('wif')
// const ecc = require('eosjs-ecc')
// const bip39 = require('bip39')
// const mnemonic = 'real flame win provide layer trigger soda erode upset rate beef wrist fame design merit'
// const seed = bip39.mnemonicToSeedHex(mnemonic)
// const master = hdkey.fromMasterSeed(Buffer(seed, 'hex'))
// const node = master.derive("m/44'/194'/0'/0/0")
// console.log("publicKey: "+ecc.PublicKey(node._publicKey).toString())
// console.log("privateKey: "+wif.encode(128, node._privateKey, false))

// result:
// publicKey: EOS61oRAVkx1rqPM8mEsBZxPAFAa9Nm6kLa7mQs6mRKTsRTFQaad7
// privateKey: 5KX4T16FtxG9LvRJukA31TP9BKq3jYve3xQ3Px3ui8mzuJ7nUYE


// const seed = bip39.mnemonicToSeedHex(mnemonic)
// const master = hdkey.fromMasterSeed(Buffer(seed, 'hex'))
// const node = master.derive("m/44'/194'/0'/0/0")
// publicKey = ecc.PublicKey(node._publicKey).toString();
// privateKey = wif.encode(128, node._privateKey, false);