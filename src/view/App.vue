<template>
  <div>
    <h1 class="title">
      Vue app
    </h1>
    <p>
      Test of <span class="yo">color</span>
    </p>
    <button @click="onClick">
      Hello, World
    </button>
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
        type: 'button-click',
        value: ''
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

.yo {
  color: red;
}
</style>
