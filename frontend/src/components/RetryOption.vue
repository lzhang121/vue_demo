<template>
    <div class="option-row">
      <!-- ログ出力 -->
      <label class="option-item">
        <input type="checkbox" v-model="logOutput" />
        ログ出力
      </label>

      <!-- 成功するまで繰り返す -->
      <label class="option-item">
        <input type="checkbox" v-model="retryUntilSuccess" />
        成功するまで繰り返す
      </label>

      <!-- 繰り返し回数（仅在选中时显示） -->
      <div v-if="retryUntilSuccess" class="retry-count">
        ⇒ 繰り返し回数：
        <input
          type="number"
          v-model.number="retryCount"
          min="1"
          max="100"
          step="1"
        />
      </div>
    </div>
  </template>

  <script setup>
  import { ref, watch, defineEmits } from 'vue'

  const emit = defineEmits(['update'])

  const logOutput = ref(false)
  const retryUntilSuccess = ref(false)
  const retryCount = ref(1)

  watch([logOutput, retryUntilSuccess, retryCount], () => {
    emit('update', {
      logOutput: logOutput.value,
      retryUntilSuccess: retryUntilSuccess.value,
      retryCount: retryUntilSuccess.value ? retryCount.value : null,
    })
  })
  </script>

  <style scoped>
  .option-row {
    display: flex;
    align-items: center;
    gap: 1.5em;
    margin-top: 10px;
    flex-wrap: wrap; /* 小屏幕自动换行 */
  }

  .option-item {
    display: flex;
    align-items: center;
    gap: 0.3em;
  }

  .retry-count {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .retry-count input[type='number'] {
    width: 80px;
    padding: 5px;
  }
  </style>
