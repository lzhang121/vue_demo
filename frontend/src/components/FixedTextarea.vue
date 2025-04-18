<template>
  <div class="textarea-wrapper" :style="{ width }">
    <div class="textarea-container">
      <!-- 提示语，点击时变大 -->
      <div
        class="fixed-placeholder"
        v-if="!inputValue && !isFocused"
        :style="{ fontSize: placeholderFontSize }"
      >
        {{ placeholder }}
      </div>

      <!-- 输入框 -->
      <textarea
        v-model="inputValue"
        class="custom-textarea"
        :rows="rows"
        :style="{ fontSize, height }"
        draggable="false"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        placeholder=""
      ></textarea>

      <!-- 删除按钮 -->
      <button
        v-if="inputValue"
        class="clear-btn"
        @click="clearText"
      >×</button>
    </div>
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
const isFocused = ref(false)  // 用于判断输入框是否获得焦点
const height = ref(props.height || 'auto')
const placeholderFontSize = ref('14px') // 提示语的字体大小

// 监听外部 modelValue 的变化
watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal
})

// 监听内部输入值的变化并同步给外部
watch(inputValue, (newVal) => {
  emit('update:modelValue', newVal)
})

const clearText = () => {
  inputValue.value = ''
}

const onFocus = () => {
  isFocused.value = true
  placeholderFontSize.value = '20px' // 提示语在获得焦点时变大
}

const onBlur = () => {
  isFocused.value = false
  placeholderFontSize.value = '14px' // 提示语失去焦点时恢复正常大小
}

// 处理输入事件（换行，自动调整高度）
const onInput = (event) => {
  // 自动调整高度以支持多行输入
  event.target.style.height = "auto"; // 重置为 auto，以便根据内容调整
  event.target.style.height = (event.target.scrollHeight) + "px"; // 设置为 scrollHeight 以自动调整高度
}
</script>

<style scoped>
.textarea-wrapper {
  width: 100%;
}

.textarea-container {
  position: relative;
}

.custom-textarea {
  width: 50%;
  min-height: 100px;
  padding: 24px 12px 12px 12px; /* 右侧留空间给按钮 */
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  resize: none; /* 禁止调整大小 */
  background-color: #e9e6f0;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.fixed-placeholder {
  position: absolute;
  top: 24px;
  left: 12px;
  color: #aaa;
  pointer-events: none; /* 确保提示文案不会阻碍输入框交互 */
  z-index: 0;
  transition: font-size 0.3s ease; /* 平滑过渡效果 */
}

.clear-btn {
  position: absolute;
  top: 28px; /* 微调位置 */
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
