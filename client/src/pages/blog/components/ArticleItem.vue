<template lang="html">
  <article class="article-item">
    <router-link :to="{name: 'ArticleDetail', params: {id: item._id}}" class="article-item__title">{{item.title}}</router-link>
    <p class="article-item__summary">{{item.summary || '暂无摘要'}}</p>
    <div class="article-item__footer">
      <ul class="tags-list">
        <li v-for="tag in item.tags">{{tag.name}}</li>
      </ul>
      <time class="time" :datatime="item.createTime">{{item.createTime | ymd}}</time>
    </div>
  </article>
</template>

<script lang="babel" type="es6">
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data () {
      return {}
    }
  }
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "../assets/sass/variables"
  .article-item
    margin: 10px 0
    padding: 10px
    // background: $white
    &:last-child
      border-bottom: none
    &__title
      position: relative
      color: $black
      font-size: $font-large
      font-weight: 400
      transition: all .2s
      &:hover
        color: $green
      &:before
        content: ''
        position: absolute
        left: 0
        bottom: -5px
        width: 100%
        height: 2px
        background: $green
        transition: transform .2s ease
        transform: scaleX(0)
        opacity: 0
      &:hover:before
        transform: scaleX(1)
        opacity: 1
    &__summary
      color: $gray
    &__footer
      @include hor-between-center
      .tags-list
        display: inline-block
        li
          float: left
          padding: 2px 5px
          margin-left: 10px
          color: $gray
          font-size: $font-small
          background: $gray-light
          transition: background .4s, color .2s
          cursor: pointer
          &:first-child
            margin-left: 0
          &:hover
            background: $green
            color: $white
      .time
        display: inline-block
        font-size: $font-small
</style>
