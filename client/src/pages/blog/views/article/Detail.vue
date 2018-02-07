<template lang="html">
  <div>
    <transition name="fade" mode="out-in">
      <loading v-if="loading"></loading>
    </transition>
    <transition name="fade" mode="out-in">
      <article class="article-detail" v-if="!loading">
        <h1 class="article-detail__title">{{article.title}}</h1>
        <time class="article-detail__createTime">{{article.createTime | ymd}}</time>
        <!--<div class="article-detail__content" v-if="!loading">-->
          <!--<h1>h1</h1>-->
          <!--<h2>h2</h2>-->
          <!--<h3>h3</h3>-->
          <!--<h4>h4</h4>-->
          <!--<h5>h5</h5>-->
        <!--</div>-->
        <div class="article-detail__content" v-html="md(article.content)" v-if="!loading"></div>
      </article>
    </transition>
  </div>

</template>

<script lang="babel" type="es6">
  export default {
    data () {
      return {
        article: {},
        loading: true
      }
    },

    created () {


      this.initData()
    },

    methods: {
      async initData () {
        this.article = await this.$http(`/api/article/${this.$route.params.id}`)
//        setTimeout(() => {
          this.loading = false
//        }, 3000)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "../../assets/sass/variables"
  .article-detail
    &__title
      text-align: center
    &__createTime
</style>
