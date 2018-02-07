<template>
  <div id="app">
    <v-header></v-header>
    <div class="container">
      <keep-alive>
        <!--<transition mode="out-in" name="fade">-->
        <router-view v-if="$route.meta.keepAlive"/>
        <!--</transition>-->
      </keep-alive>
      <!--<transition mode="out-in" name="fade">-->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!--</transition>-->
    </div>
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
  [v-cloak]
    display: none

  .container
    $gap: 30px
    max-width: 1000px
    margin: ($header-height + $gap) auto $gap
    & > div
      $mx: 1em
      margin-left: $mx
      margin-right: $mx
</style>
