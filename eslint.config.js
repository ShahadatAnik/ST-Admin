import eslint from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist', 'src/components/ui'] },
	{
		extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			// parserOptions: {
			// 	project: ['./tsconfig.node.json', './tsconfig.app.json'],
			// 	tsconfigRootDir: import.meta.dirname,
			// },
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-empty-object-type': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			// 'unicorn/filename-case': [
			// 	'error',
			// 	{
			// 		case: 'kebabCase',
			// 		ignore: ['README.md'],
			// 	},
			// ],
		},
	}
);
