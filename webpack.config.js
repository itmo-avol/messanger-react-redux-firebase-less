const Path = require( 'path' );

const config = {
	entry: './scripts/index.ts',
	output: {
		path: Path.resolve( __dirname, 'public/scripts' ),
		publicPath: '/scripts/',
		filename: '[name].js',
		chunkFilename: 'chunk-[chunkhash].js',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFileName: './tsconfig.json',
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
};

module.exports = config;
