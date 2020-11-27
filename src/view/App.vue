<template>
  <div>
    <h1 class="title">
      Vue app
    </h1>
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
  created () {

  },
  methods: {
    onBlur (ev: FocusEvent): any {

    },
    onClick () {
      postMessage({
        type: 'echo',
        value: 'Hello from Vue!'
      })
    },
    onFocus (ev: FocusEvent): any {

    }
  }
})
</script>

<style lang="scss">
.title {
  color: blue;
}
</style>
