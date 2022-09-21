module.exports = {
    env: {
        browser: true,
        es2021: true,
        mocha: true,
    },
    extends: 'standard-with-typescript',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'indent': ['error', 4, {
            SwitchCase: 1,
        }],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'never',
            exports: 'never',
            functions: 'never',
        }],
        'quote-props': ['error', 'consistent-as-needed'],
    },
}
