import * as bip39 from 'bip39';
import * as hdkey from 'ethereumjs-wallet/hdkey';

import { IWallet } from '../common/wallet';


export function generateWallet(): IWallet {
    const mnemonic = bip39.generateMnemonic()

    const seed = bip39.mnemonicToSeed(mnemonic);
    const hdKey = hdkey.fromMasterSeed(seed);
    const derivedHdKey = hdKey.derivePath("m/44'/60'/0'/0").deriveChild(0);
    const wallet = derivedHdKey.getWallet();
    const address = `0x${wallet.getAddress().toString('hex')}`;

    return {
        type: 'ethereum',
        address: address,
        keyPair: {
            publicKey: wallet.getPublicKeyString(),
            privateKey: wallet.getPrivateKeyString(),
        }
    };
}
