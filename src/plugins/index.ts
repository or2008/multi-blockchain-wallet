import * as bitcoinPlugin from './bitcoin';
import * as ethereumPlugin from './ethereum';
import * as eosPlugin from './eos';
import * as tronPlugin from './tron';

export const plugins = {
    bitcoin: bitcoinPlugin,
    ethereum: ethereumPlugin,
    eos: eosPlugin,
    tron: tronPlugin
};