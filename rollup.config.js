import pkg from './package.json'
import babel from 'rollup-plugin-babel'
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
			babel({
				exclude: 'node_modules/**'
			}),
			minify()
		]
	},
	{
		input: 'src/main.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	},
	{
		input: 'src/dom/toHTML.js',
		output: [
			{ file: 'dist/dom/toHTML.js', format: 'es' }
		]
	},
	{
		input: 'src/dom/isDirty.js',
		output: [
			{ file: 'dist/dom/isDirty.js', format: 'es' }
		]
	},
	{
		input: 'src/dom/wrap.js',
		output: [
			{ file: 'dist/dom/wrap.js', format: 'es' }
		]
	},
	{
		input: 'src/props/readProp.js',
		output: [
			{ file: 'dist/props/readProp.js', format: 'es' }
		]
	},
	{
		input: 'src/props/forEach.js',
		output: [
			{ file: 'dist/props/forEach.js', format: 'es' }
		]
	}
];
