<template lang="html">
  <header id="header">
    <!--<router-link :to="{name: 'Article'}" class="brand" data-dummy="leekoho-blog">leekoho-blog</router-link>-->
    <ul class="menu-list">
      <router-link class="menu-list__item" v-for="menu in menuList" :key="menu.name" :to="{name: menu.name}"
                   tag="li" exact>
        <a class="menu-list__link">{{menu.label}}</a>
      </router-link>
      <li class="menu-list__line" :style="[menuListLineStyle]"></li>
    </ul>
  </header>
</template>

<script lang="babel" type="es6">
  export default {
    data () {
      return {
        menuList: [{
          label: 'Article',
          name: 'ArticleList'
        }, {
          label: 'Tag',
          name: 'Tag'
        }, {
          label: 'Links',
          name: 'Links'
        }]
      }
    },
    computed: {
      menuListLineStyle () {
        for (let i = 0; i < this.menuList.length; i++) {
          let item = this.menuList[i]
          if (item.name === this.$route.name) {
            return {
              // width + margin-left
              transform: `translateX(${(i) * (70 + 10)}px)`
            }
          }
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "../assets/sass/variables"
  #header
    position: relative
    height: $header-height
    box-shadow: 0 0 $header-shadow-blur-radius $gray
    user-select: none
    .menu-list
      position: relative
      max-width: 1000px
      margin: 0 auto
      font-weight: 500
      $item-width: 70px
      &__item
        display: inline-block
        margin-left: 10px
        width: $item-width
        text-align: center
        &:first-child
          margin-left: 0
        a
          display: block
      &__line
        position: absolute
        left: 0
        bottom: -1.5px
        width: $item-width
        height: 3px
        background: $green
        transition: transform .2s ease
        transform: translateX(0)
      &__link
        line-height: $header-height
        color: $black
</style>
