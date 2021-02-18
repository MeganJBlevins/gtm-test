<template>
  <div>
    <h1>Posts</h1>
    <button @click="testGTM">
      Trigger GTM Event
    </button>
    <GenericContentAPI />
  </div>
</template>

<script>
import GenericContentAPI from '~/components/GenericContentAPI.vue'
import { pageview } from '~/mixins/gtm.js'

export default {
  components: {
    GenericContentAPI
  },
  mixins: [pageview],
  data () {
    return {
      title: 'Nuxt Test: About'
    }
  },
  methods: {
    testGTM () {
      this.$gtmEvent('Test Cat', 'click', 'Test Label')
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'My custom description' } // If you remove this description, or comment it out, the page will use the description in nuxt.config.js
      ]
    }
  },
}
</script>
