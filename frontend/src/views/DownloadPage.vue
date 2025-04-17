<template>
  <div class="container">
    <TopBar />
    <div class="result-container">
      <h2>WSS生成結果</h2>
      <pre>{{ result }}</pre>
    </div>
  </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue'
  import TopBar from '@/components/TopBararea.vue'

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
    font-size: 16px;
    line-height: 1.5;
    color: #333;
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

  .container {
  padding: 2vw;
  font-size: 2vw;
  background-color: white;
}

@media (max-width: 600px) {
  .container {
    background-color: lightgreen;
  }
}
  </style>
