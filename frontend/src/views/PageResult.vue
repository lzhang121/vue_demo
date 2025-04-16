<template>
    <div class="result-container">
      <h2>WSS生成結果</h2>
      <pre>{{ result }}</pre>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue'

  const result = ref('')

  onMounted(() => {
    const stored = sessionStorage.getItem('wssResult')
    result.value = stored ? JSON.parse(stored) : '結果が見つかりません。'
  })
  </script>

  <style scoped>
  .result-container {
    max-width: 800px;
    margin: 40px auto;
    font-family: sans-serif;
    padding: 20px;
    background: #f8f8f8;
    border-radius: 8px;
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
    background: #eee;
    padding: 16px;
    border-radius: 4px;
  }
  </style>
