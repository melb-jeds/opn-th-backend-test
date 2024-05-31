module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'import', 'unused-imports'],
	extends: ['plugin:@typescript-eslint/recommended'],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js', 'dist', 'node_modules'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'unused-imports/no-unused-vars': 'off',
		'import/order': [
			'error',
			{
				'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				'alphabetize': {
					order: 'asc',
					caseInsensitive: true,
				},
				'newlines-between': 'always',
			},
		],
		'import/no-unused-modules': 'error',
		'import/no-unassigned-import': 'off',
		'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
	},
}
