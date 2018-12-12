import { plugin as bitcoinPlugin } from './plugins/bitcoin';
import { plugin as ethereumPlugin } from './plugins/ethereum';
import { plugin as eosPlugin } from './plugins/eos';
import { plugin as tronPlugin } from './plugins/tron';
import { IPlugin } from './common/plugin';

interface IPluginMap {
    [key: string]: IPlugin
}
const pluginMap: IPluginMap = {
    bitcoin: bitcoinPlugin,
    ethereum: ethereumPlugin,
    eos: eosPlugin,
    tron: tronPlugin
};

export function getPluginByType<T extends IPlugin>(type = 'ethereum'): T {
    return pluginMap[type] as T;
}
