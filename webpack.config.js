const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map', // for prod: source-map
	entry: './src/main.ts',
	output: {
		publicPath: 'public',
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
};
