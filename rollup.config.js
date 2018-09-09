import pkg from './package.json';
import minify from 'rollup-plugin-babel-minify'

export default [
	{
		input: 'src/main.js',
		output: {
			name: 'jsforms.core',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			minify()
		]
	},
	{
		input: 'src/main.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];
