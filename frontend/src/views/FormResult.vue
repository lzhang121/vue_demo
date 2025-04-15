<template>
  <div>
    <h1>提交结果</h1>
    <pre>{{ resultData }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: String,
      required: true
    }
  },
  computed: {
    resultData() {
      if (!this.result) return null;
      try {
        return JSON.parse(this.result);
      } catch (err) {
        console.error('解析失败', err);
        return null;
    }
    }
  }
}
</script>
