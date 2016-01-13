var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');

// Detect npm lifecycle event (start, build, ...)
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	src: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'build')
};

const common = {
	entry: [path.join(PATHS.src, 'index.jsx')],
	module: {
		preLoaders: [{
			test: /\.jsx?$/,
			loader: 'eslint-loader',
			include: PATHS.src
		}],
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'react-hot!babel'
		}, {
			test: /\.css$/,
			include: path.join(PATHS.src, 'css'),
			loader: 'style!css'
		}, {
			test: /\.json$/,
			exclude: /node_modules/,
			loader: 'json'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};

const development = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server'
	],
	output: {
		path: PATHS.build,
		publicPath: '/',
		filename: 'bundle.js'
	},
	devtool: 'eval-source-map',
	devServer: {
		contentBase: PATHS.build,
		hot: true,
		historyApiFallback: true,
		inline: true,
		progress: true,

		// Display only errors to reduce the amount of output.
		stats: 'errors-only',

		// Parse host and port from env so this is easy to customize.
		host: process.env.HOST,
		port: process.env.PORT
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};

if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, development);
}