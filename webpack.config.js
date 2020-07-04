const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
        index: "./src/app.js",
    },
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "public/js/bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.pug$/,
				loader: "pug-loader",
			},
			{
				test: /\.(jpg|png|gif|jpeg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "public/img/",
							useRelativePath: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new htmlWebpackPlugin({
            template: "./src/views/index.pug",
            filename: "index.html",
			minify: {
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
				collapseWhitespace: true,
			},
		}),
		new miniCssExtractPlugin({
			filename: "public/css/bundle.css",
		}),
	],
};
