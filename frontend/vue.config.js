module.exports = {
  devServer: {
    hot: false,              // 关闭热模块替换
    liveReload: false,       // 关闭页面自动刷新
    client: false,           // ✅ 彻底禁用 websocket 客户端注入
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
  }
}
}
