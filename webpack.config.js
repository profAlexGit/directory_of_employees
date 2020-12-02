const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	context: __dirname,
	// entry: path.resolve(__dirname, './src/index.jsx'),
	entry: {
		main: ['webpack-dev-server/client', './src/index.tsx'],
	}, //path.resolve(__dirname, './src/index.jsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'static/js/bundle.js',
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							filename: 'bundle.js',
						},
					},
				],
			},

			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'ts-loader'],
			},

			{
				test: /\.(png|jpg|jpeg|gif|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets',
							name: '[name]-[sha1:hash:7].[ext]',
						},
					},
				],
			},

			{
				test: /\.(css)$/,
				use: [MiniCssExtactPlugin.loader, 'css-loader'],
			},

			{
				test: /\.(s[ca]ss)$/,
				use: [MiniCssExtactPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'directory of employees',
			template: 'public/index.html',
		}),
		new MiniCssExtactPlugin({
			filename: 'main.css',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],

	devServer: {
		contentBase: path.resolve(__dirname, './dist'),
		open: true,
		hot: true,
	},
};
