/* eslint-disable import/no-commonjs */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],

    parser: '@typescript-eslint/parser',

    parserOptions: {
        // 1️⃣ Dizemos onde ficam os tsconfigs
        tsconfigRootDir: __dirname,

        // 2️⃣ Listamos todos os tsconfigs que o monorepo contém.
        //    Use glob para não precisar atualizar manualmente se nascerem novos pacotes.
        project: ['./apps/*/tsconfig.json'],

        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },

    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],

    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },

    settings: { react: { version: 'detect' } },
};
