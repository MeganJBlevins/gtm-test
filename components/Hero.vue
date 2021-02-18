<template>
  <div
    id="hero"
    class="hero"
    :class="{'loaded': isLoaded }"
  >
    <iframe :src="windowWidth > 600 ? desktopVideo : mobileVideo" allow=autoplay />
  </div>
</template>
<script>
export default {
  name: 'Hero',
  data () {
    return {
      windowWidth: 0,
      mobileVideo: 'https://player.vimeo.com/video/511609176?autoplay=1&loop=1&muted=1&background=1',
      desktopVideo: 'https://player.vimeo.com/video/508542825?autoplay=1&loop=1&muted=1&background=1',
      isLoaded: false
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)
    })
    this.getWindowWidth()
    // this.loadIFrame()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowWidth)
    window.removeEventListener('resize', this.getWindowHeight)
  },
  methods: {
    getWindowWidth (event) {
      this.windowWidth = document.documentElement.clientWidth
    },
    loadIFrame () {
      const iframe = document.createElement('iframe')
      const hero = document.getElementById('hero')
      let src = this.desktopVideo
      if (this.windowWidth < 600) {
        src = this.mobileVideo
      }
      iframe.src = src
      hero.appendChild(iframe)
      this.isLoaded = true
      // console.log('is loaded: ', this.isLoaded)
    }
  }
}
</script>
