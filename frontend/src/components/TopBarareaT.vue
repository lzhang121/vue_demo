<!-- App.vue -->
<template>
    <div class="page-wrapper">
      <div class="header-bar">
        WSS生成エディタ｜開発モード
      </div>
      <!-- 其他内容 -->
    </div>
  </template>

  <style>
  /* 彻底清空所有 margin 和 padding */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 页面高度必须设置 100% */
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  /* 页面 wrapper 不留空隙 */
  .page-wrapper {
    min-height: 100%;
    background: #f5f5f5;
  }

  /* 顶部栏样式 */
  .header-bar {
    background-color: navy;
    color: white;
    padding: 16px;
    font-weight: bold;
    font-size: 18px;
  }
  </style>
