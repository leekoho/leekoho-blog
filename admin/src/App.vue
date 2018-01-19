<template lang="html">
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="babel" type="es6">
  export default {
    name: 'app'
  }
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "./assets/sass/main"
  #app
    min-height: 100%
    font-family: 'Avenir', Helvetica, Arial, sans-serif
</style>
