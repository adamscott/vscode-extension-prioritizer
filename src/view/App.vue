<template>
  <div>
    <h1>Vue app</h1>
    <input
      value="Hello, World"
      type="button"
      @click="onClick"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { postMessage } from '@view/modules/vscode'

export default defineComponent({
  methods: {
    onClick () {
      postMessage({
        type: 'echo',
        value: 'Hello from Vue!'
      })
    }
  }
})
</script>
