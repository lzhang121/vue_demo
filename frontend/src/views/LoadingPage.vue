<template>
  <TopBar />
    <div class="loading-page">
      <h2>テスト中です....</h2>
      <p>お待ちください</p>
      <div class="spinner"></div>
    </div>
  </template>

  <script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import TopBar from '@/components/TopBararea.vue'

  const router = useRouter()

  onMounted(async () => {
    try {
      const res = await fetch('http://127.0.0.1:5001/api/check')
      const data = await res.json()
      if (data.status === 'success') {
        router.push('/success')
      } else {
        router.push('/failure')
      }
    } catch (err) {
      router.push('/failure')
    }
  })
  </script>

  <style scoped>
  .loading-page {
    text-align: center;
    height: 10vh;
    padding: 100px 20px;
  }

  .spinner {
    margin: 20px auto;
    width: 40px;
    border: 4px solid #ccc;
    border-top-color: #409eff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  </style>
