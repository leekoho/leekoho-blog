<template lang="html">
  <header id="header">
    <!--<router-link :to="{name: 'Article'}" class="brand" data-dummy="leekoho-blog">leekoho-blog</router-link>-->
    <ul class="menu-list">
      <router-link class="menu-list__item" v-for="(menu, idx) in menuList" :key="menu.name" :to="{name: menu.name}"
                   @mouseover.native="mouseover(idx)" @mouseout.native="mouseout" tag="li" exact>
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
          label: '文章',
          name: 'Article'
        }, {
          label: '标签',
          name: 'Tag'
        }, {
          label: '友链',
          name: 'Link'
        }],
        menuListLineStyle: {
          transform: `translateX(0)`
        },
        last: null
      }
    },
    created () {
      this.setProperPos()
    },
    methods: {
      // 设置正确的位置
      setProperPos () {
        this.menuList.some((item, idx) => {
          if (this.$route.name.indexOf(item.name) > -1) {
            this.menuListLineStyle = {
              // width + margin-left
              transform: `translateX(${(idx) * (70 + 10)}px)`
            }
            return true
          }
        })
      },
      mouseover (idx) {
        clearTimeout(this.last)
        this.menuListLineStyle = {transform: `translateX(${(idx) * (70 + 10)}px)`}
      },
      mouseout () {
        // 函数节流
        this.last = setTimeout(() => {
          this.setProperPos()
        }, 200)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "../assets/sass/variables"
  #header
    position: fixed
    left: 0
    top: 0
    width: calc(100% + #{$scrollbar-width})
    height: $header-height
    background: $white
    box-shadow: 0 0 $header-shadow-blur-radius $gray
    user-select: none
    z-index: 10
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
