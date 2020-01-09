const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:5].js',
    path: path.resolve('dist'),
    // publicPath: '/'
  },
  devServer: {
    contentBase: './dist', // 本地服务器加载的目录
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    port: 3000, // 端口
    open: true, // 自动打开浏览器
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
      filename: 'index.html',				// 开发服务器中生成的临时文件
      minify: {
        removeAttributeQuotes: true,	// 是否去除文件中的双引号
        collapseWhitespace: true		// 是否去除文件中的空行
      },
    }),
    new CleanWebpackPlugin(), // 打包先清空
    /* 提取单独打包css文件 */
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules)/,  //排除掉nod_modules,优化打包速度
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          "url-loader"
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
}