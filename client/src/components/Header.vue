<template lang="html">
  <header id="header">
    <nav class="nav">
      <router-link :to="{name: 'Blog'}" class="logo">
        <img src="../assets/images/logo.png" alt="logo" class="logo__img">
      </router-link>
      <ul class="menu-list">
        <router-link class="menu-list__item" v-for="menu in menuList" :key="menu.name" :to="{name: menu.name}" tag="li" exact>
          <a class="menu-list__link">{{menu.label}}</a>
        </router-link>
      </ul>
    </nav>
  </header>
</template>

<script lang="babel" type="es6">
  export default {
    data () {
      return {
        menuList: [{
          label: '文章',
          name: 'Blog'
        }, {
          label: '标签',
          name: 'Tag'
        }]
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/sass">
  #header
    width: 100%
    box-shadow: 0 0 5px rgba(0, 0, 0, .25)
    .nav
      max-width: 750px
      height: $nav-height
      margin: 0 auto
      .logo
        float: left
        &__img
          width: $nav-height - 10px
          padding: 5px

  .menu-list
    float: right
    .router-link-active
      border-bottom: 2px solid $green
    &__item
      display: inline-block
      margin-left: 10px
      &:first-child
        margin-left: 0
    &__link
      $gap: 10px
      padding: $gap
      line-height: $nav-height
      color: $black
</style>
