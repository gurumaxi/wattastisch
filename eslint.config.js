import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs['flat/recommended'],
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parserOptions: {
                parser: ts.parser,
            },
        },
    },
    {
        ignores: ['node_modules', 'build', '.svelte-kit', 'dist', 'package-lock.json'],
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': ['off'],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            'array-element-newline': ['error', 'consistent'],
            'brace-style': ['error', '1tbs'],
            camelcase: 'error',
            'comma-dangle': ['error', 'always-multiline'],
            curly: ['error', 'all'],
            'dot-notation': 'error',
            eqeqeq: ['error', 'always'],
            'eol-last': ['error', 'always'],
            indent: ['error', 4],
            'no-confusing-arrow': 'error',
            'no-else-return': 'error',
            'no-multiple-empty-lines': ['error', { max: 2 }],
            'no-return-await': 'error',
            'no-undef-init': 'error',
            'no-unneeded-ternary': 'error',
            'no-useless-return': 'error',
            'no-var': 'error',
            'object-curly-spacing': ['error', 'always'],
            'object-shorthand': ['error', 'always'],
            'prefer-const': 'error',
            'prefer-template': 'error',
            quotes: ['error', 'single'],
            'quote-props': ['error', 'as-needed'],
            semi: ['error', 'always'],
            'spaced-comment': ['error', 'always'],
            yoda: 'error',
        },
    },
];
