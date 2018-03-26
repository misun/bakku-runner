module.exports = {
  entry: "./lib/bakku-runner.js",
  output: {
  	filename: "./bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", "*"]
  }
};
