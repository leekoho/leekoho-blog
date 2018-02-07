<template lang="html">
  <div class="loading" :style="loadingStyle">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 30 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path transform="translate(0 0)" d="M0 12 V20 H4 V12z">
    <animateTransform attributeName="transform" type="translate" values="0 0; 28 0; 0 0; 0 0" dur="1.5s" begin="0" repeatCount="indefinite" keytimes="0;0.3;0.6;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
  </path>
  <path opacity="0.5" transform="translate(0 0)" d="M0 12 V20 H4 V12z">
    <animateTransform attributeName="transform" type="translate" values="0 0; 28 0; 0 0; 0 0" dur="1.5s" begin="0.1s" repeatCount="indefinite" keytimes="0;0.3;0.6;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
  </path>
  <path opacity="0.25" transform="translate(0 0)" d="M0 12 V20 H4 V12z">
    <animateTransform attributeName="transform" type="translate" values="0 0; 28 0; 0 0; 0 0" dur="1.5s" begin="0.2s" repeatCount="indefinite" keytimes="0;0.3;0.6;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
  </path>
</svg>
  </div>
</template>

<script lang="babel" type="es6">
  export default {
    props: {
      color: {
        type: String,
        default: '#088'
      },
      size: {
        type: Object,
        default: () => ({
          width: '65px',
          height: '65px'
        })
      }
    },
    computed: {
      loadingStyle () {
        return {fill: this.color, width: this.size.width, height: this.size.height}
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/sass">
  .loading
    position: fixed
    left: 50%
    top: 50%
    margin: 0 auto
    text-align: center
    transform: translateX(-50%) translateY(-50%)
</style>
