<script lang="js">
  export default {
    data() {
      return {
        counter: 0
      }
    }
  }
</script>

<template>
  <h1>Hello from vue</h1>
  <p>{{counter}}</p>
  <button @click="counter++">Increment</button>
</template>
