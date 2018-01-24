<template>
  <div id="app">
    <v-header></v-header>
    <transition mode="out-in" name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script lang="babel" type="es6">
  import vHeader from './components/Header.vue'

  export default {
    name: 'app',
    components: {
      vHeader
    }
  }
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "./assets/sass/main"
</style>
