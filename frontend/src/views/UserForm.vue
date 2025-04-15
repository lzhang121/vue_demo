<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">

      <!-- 模型输入框 -->
      <div class="form-group">
        <label>模型：</label>
        <div class="input-with-tooltip">
          <textarea
            v-model="form.model"
            maxlength="20"
            placeholder="请输入模型名（最多20字符）"
            :style="{ height: '80px' }"
          ></textarea>
          <div class="info-wrapper">
            <span class="info-icon" @click="toggleTooltip('model')">ℹ️</span>
            <div
              v-if="tooltipVisible.model"
              class="tooltip"
            >
              模型字段用于填写调用的模型名称，如 "gpt-4"。
            </div>
          </div>
        </div>
      </div>

      <!-- 提示语输入框 -->
      <div class="form-group">
        <label>提示语：</label>
        <div class="input-with-tooltip">
          <textarea
            v-model="form.prompt"
            maxlength="200"
            placeholder="请输入提示语（最多200字符）"
            :style="{ height: '160px' }"
          ></textarea>
          <div class="info-wrapper">
            <span class="info-icon" @click="toggleTooltip('prompt')">ℹ️</span>
            <div
              v-if="tooltipVisible.prompt"
              class="tooltip"
            >
              提示语用于引导模型生成内容，建议清晰具体。
            </div>
          </div>
        </div>
      </div>
<!-- 复选框 -->
<div class="form-group checkbox-group">
        <label>
          <input type="checkbox" v-model="form.simpleMode" />
          简单模式
        </label>
        <label>
          <input type="checkbox" v-model="form.complexMode" />
          复杂模式
        </label>
      </div>

      <!-- 模型名 -->
      <div class="form-group">
        <label>模型名：</label>
        <select v-model="form.modelName">
          <option disabled value="">请选择模型</option>
          <option>chatgpt2.0</option>
          <option>chatgpt3.0</option>
          <option>chatgpt4.0</option>
        </select>
      </div>

      <!-- 提交按钮 -->
      <div class="form-actions">
        <button type="submit">提交</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        model: '',
        prompt: '',
        selectedModel: 'chatgpt2.0'  // 设置默认值为 chatgpt2.0
      },
      tooltipVisible: {
        model: false,
        prompt: false
      }
    };
  },
  methods: {
    toggleTooltip(field) {
      // 切换当前提示框的显示与隐藏
      this.tooltipVisible[field] = !this.tooltipVisible[field];
    },
    async handleSubmit() {
      const res = await fetch('http://localhost:5001/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      });
      const data = await res.json();
      this.$router.push({ name: 'FormResult', params: { result: JSON.stringify(data) } });
    },
    handleClickOutside(event) {
      // 点击页面任意地方关闭 tooltip
      if (!event.target.closest('.info-wrapper')) {
        this.tooltipVisible.model = false;
        this.tooltipVisible.prompt = false;
      }
    }
  },
  mounted() {
    // 点击页面任意地方关闭 tooltip
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    // 在 Vue 3 中，使用 beforeUnmount 替代 beforeDestroy
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

textarea {
  width: 60%;
  padding: 6px;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
}

.input-with-tooltip {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.info-wrapper {
  position: relative;
}

.info-icon {
  cursor: pointer;
  font-size: 18px;
  color: #007bff;
}

.form-actions {
  width: 60%;
  text-align: right; /* 使提交按钮右对齐 */
  margin-top: 20px; /* 给按钮上方增加一点间距 */
}

.tooltip {
  position: absolute;
  top: 24px;
  left: 0;
  background: #f5f5f5;
  color: #333;
  padding: 8px 10px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  font-size: 13px;
  white-space: nowrap;
  z-index: 1000;
}
</style>
