module.exports = function config(api) {
    api.cache(false);

    const presets = [
        '@babel/preset-env',
        '@babel/preset-typescript'
    ];
    const plugins = [
        '@babel/plugin-transform-runtime'
    ];

    return {
        sourceType: 'unambiguous',
        presets,
        plugins
    };
};
