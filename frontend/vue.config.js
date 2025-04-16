module.exports = {
  devServer: {
    hot: false,
    liveReload: false,
    client: false,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
  }
}
}
