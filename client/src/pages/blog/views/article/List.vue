<template lang="html">
  <div class="article-list">
    <article-item v-for="item in remoteData.articleList" :key="item._id" :item="item"></article-item>
  </div>
</template>

<script lang="babel" type="es6">
  import ArticleItem from '../../components/ArticleItem.vue'
  export default {
    data () {
      return {
        remoteData: {}
      }
    },

    created () {
      this.initData()
    },

    methods: {
      async initData () {
        this.remoteData = await this.$http.get('/api/article')
      }
    },

    components: {
      ArticleItem
    }
  }
</script>

<style lang="sass" rel="stylesheet/sass">

</style>
