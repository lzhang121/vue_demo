<template>
  <div class="textarea-wrapper" :style="{ width }">
    <textarea
      v-model="inputValue"
      class="custom-textarea"
      :rows="rows"
      :style="{ fontSize, height }"
      draggable="false"
    ></textarea>

    <div class="fixed-placeholder" :style="{ fontSize }">
      {{ placeholder }}
    </div>

    <!-- 删除按钮现在显示在输入框内 -->
    <button
      v-if="inputValue"
      class="clear-btn"
      @click="clearText"
    >×</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请输入内容，可换行：',
  },
  rows: {
    type: Number,
    default: 4,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '',
  },
  fontSize: {
    type: String,
    default: '14px',
  },
  backgroundColor: {
    type: String,
    default: '#e9e6f0',
  },
  resize: {
    type: String,
    default: 'none',
  },
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

// watch 外部 modelValue 的变化
watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal
})

// watch 内部输入值的变化并向外同步
watch(inputValue, (newVal) => {
  emit('update:modelValue', newVal)
})

const clearText = () => {
  inputValue.value = ''
}
</script>

<style scoped>
.custom-textarea {
  width: 100%;
  min-height: 100px;
  padding: 24px 40px 12px 12px; /* 右边多留空间给按钮 */
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  resize: none; /* 禁止调整大小 */
  user-select: none; /* 禁止选择文本 */
  background-color: #f5f5f5;
}

.clear-btn {
  position: absolute;
  top: 28px; /* 根据 padding-top + line-height 微调 */
  right: 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  color: #888;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  z-index: 1;
}

.clear-btn:hover {
  color: #f5222d;
}
</style>
