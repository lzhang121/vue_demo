<template>
  <div class="container">
    <h1>{{ getMessage }}</h1>

    <input v-model="name" placeholder="Enter your name" />
    <button @click="sendPost">Send POST</button>

    <p>{{ postMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      getMessage: '',
      postMessage: '',
      name: ''
    }
  },
  mounted() {
    axios.get('http://localhost:5001/api/get-data')
      .then(res => {
        this.getMessage = res.data.message
      })
  },
  methods: {
    sendPost() {
      axios.post('http://localhost:5001/api/post-data', { name: this.name })
        .then(res => {
          this.postMessage = res.data.message
        })
    }
  }
}
</script>

<style>
.container {
  padding: 2rem;
}
</style>
