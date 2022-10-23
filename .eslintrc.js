module.exports = {
    extends: [
        '@pionxzh/eslint-config-ts',
    ],
    overrides: [{
        files: ['example/**'],
        rules: {
            'no-console': 'off',
        },
    }],
}
