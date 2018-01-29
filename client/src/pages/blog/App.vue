<template>
  <div id="app">
    <v-header></v-header>
    <transition mode="out-in" name="fade">
      <div class="container">
        <router-view/>
      </div>
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
  .container
    max-width: 1000px
    margin: 30px auto 0
    & > div
      margin-left: 10px
      margin-right: 10px
</style>
