const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
    if (IS_DEV) return 'com.karmalok.multilingual2048.dev';
    if (IS_PREVIEW) return 'com.karmalok.multilingual2048.preview';
    return 'com.karmalok.multilingual2048';
};

const getAppName = () => {
    if (IS_DEV) return '2048 (Dev)';
    if (IS_PREVIEW) return '2048 (Preview)';
    return '2048-multilanguage';
};

module.exports = ({ config }) => ({
    ...config,
    name: getAppName(),
    ios: {
        ...config.ios,
        bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
        ...config.android,
        package: getUniqueIdentifier(),
    },
});
