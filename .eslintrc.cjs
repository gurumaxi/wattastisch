module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:svelte/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        extraFileExtensions: ['.svelte'],
    },
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
        },
    ],
    rules: {
        'array-element-newline': ['error', 'consistent'],
        'brace-style': ['error', '1tbs'],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'never',
                functions: 'never',
            },
        ],
        'eol-last': ['error', 'always'],
        indent: ['error', 4],
        'no-multiple-empty-lines': ['error', { max: 2 }],
        'object-curly-spacing': ['error', 'always'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        camelcase: 'error',
        eqeqeq: ['error', 'always'],
        'no-confusing-arrow': 'error',
        'no-return-await': 'error',
        'no-unneeded-ternary': 'error',
        'object-shorthand': 'error',
        'quote-props': ['error', 'as-needed'],
        'spaced-comment': ['error', 'always'],
        yoda: 'error',
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
    },
};
