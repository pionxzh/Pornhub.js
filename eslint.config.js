const pionxzh = require('@pionxzh/eslint-config').default

module.exports = pionxzh(
    {
        typescript: true,
        react: false,
        vue: false,
        yaml: false,
        ignores: [
            '**/node_modules/**',
            '/dist/**',
        ],
    },
    {
        rules: {
            'ts/ban-types': 'off',
            'test/prefer-lowercase-title': 'off',
            'pionxzh/top-level-function': 'off',
        },
    },
    {
        files: ['example/**'],
        rules: {
            'no-console': 'off',
        },
    },
)
