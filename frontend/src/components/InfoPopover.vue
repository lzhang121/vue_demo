<template>
    <a-popover
      :title="title"
      :content="content"
      :trigger="trigger"
      :placement="placement"
    >
      <template #default>
        <InfoCircleOutlined
          :style="{
            color,
            fontSize: size,
            cursor: 'pointer',
          }"
        />
      </template>
    </a-popover>
  </template>

  <script setup>
  import { InfoCircleOutlined } from '@ant-design/icons-vue'

  // Props 接收父组件传参
  defineProps({
    title: {
      type: String,
      default: 'prompt info',
    },
    content: {
      type: String,
      default: 'This is an information bubble.',
    },
    trigger: {
      type: String,
      default: 'hover',
    },
    placement: {
      type: String,
      default: 'top',
    },
    color: {
      type: String,
      default: '#1890ff',
    },
    size: {
      type: String,
      default: '18px',
    },
  })
  </script>
