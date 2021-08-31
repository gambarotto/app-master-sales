/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: ['react-native-reanimated/plugin'],
    };
};