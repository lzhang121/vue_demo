<template>
  <div class="message-wrapper">
    <h2 :style="{ color }">{{ message }}</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    default: '検出成功',
  },
  color: {
    type: String,
    default: '#52c41a', // 默认绿色
  },
})
console.log(props.message, props.color)
</script>

<style scoped>
.message-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: #f0f9f5;
  text-align: center;
}
</style>
