const path = require('path');
const nodeExternals = require('webpack-node-externals');
const copyWebpackPlugin = require('copy-webpack-plugin');
console.log(path.resolve(__dirname, "dist"))
module.exports = {
	entry:'./index.js',
	mode: 'production',
	target:"node",
	output:{
		path: path.resolve(__dirname, "dist"),
		filename:'index.js',
		publicPath: path.resolve(__dirname, "statics")
	},
	node: {
		
	},
	externals: [
        nodeExternals()
    ],
	module: {
    },
	plugins:[

		new copyWebpackPlugin({
			patterns:[
				{  // 插件 复制静态文件等
				from: path.resolve(__dirname, "./statics"),
				to:path.resolve(__dirname, "./dist/statics")
			},{  // 插件 复制静态文件等

				from: path.resolve(__dirname, "./.env.production"),
				to: path.resolve(__dirname, "./dist/"),
				force: true,
				priority: 10
			}]
		})
	],
	resolve:{
        
	}
}