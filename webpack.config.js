const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.join(__dirname,'/dist'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{
				test:/\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
			    test: /\.css$/,
			    //loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
			    use: [ 'style-loader', 'css-loader' ]
			},
			{
		        test: /\.json$/,
		        //include: [paths.appSrc, paths.appNodeModules],
		        use: {
		        	loader: 'json-loader'
		        }
	      	},
		]
	},	
	resolve: {
        alias: {
          actions: path.resolve('src/actions'),
          reducers: path.resolve('src/reducers'),
          views: path.resolve('src/views'),
          node_modules: path.resolve('node_modules')
        }
    },
	plugins: [
		//new HtmlWebpackPlugin() crea el archivo html principal
		//Se puede especificar un template tambien ej:
		new HtmlWebpackPlugin({
			template:'src/index.html'
		})
	]
}