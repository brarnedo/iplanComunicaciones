import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		languageOptions: { globals: globals.browser },
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'no-unused-vars': 'warn',
		},
	},
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	eslintConfigPrettier,
];
