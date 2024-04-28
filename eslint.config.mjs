import { pionxzh } from '@pionxzh/eslint-config'

export default pionxzh(
    {
        typescript: true,
        yaml: false,
    },
    {
        rules: {
            'ts/ban-types': 'off',
            'test/prefer-lowercase-title': 'off',
            'pionxzh/top-level-function': 'off',
            'import/order': ['error', {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
            }],
        },
    },
    {
        files: ['example/**'],
        rules: {
            'no-console': 'off',
        },
    },
)
