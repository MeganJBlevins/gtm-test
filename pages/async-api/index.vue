<template>
  <section class="container">
    <h1>Async API SSR Example</h1>
    <ul>
      <li v-for="(person, index) in people" :key="index">
        <h3>{{ person.name }}</h3>
        <article>{{ person.email }}</article>
      </li>
    </ul>
  </section>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { pageview } from '~/mixins/gtm.js'

Vue.use(VueAxios, axios)

export default {
  mixins: [pageview],
  asyncData ({ context, error }) {
    // Using asyncdata should cause server rendering when the url is accessed directly when using nuxt as an app
    // It will statically generate on build when using the `generate` command.
    // NOTE: this will only work in pages, and you don't have access to "this", try "context" if you need this
    // The data you return will be merged with your data defined above.
    // https://nuxtjs.org/guide/async-data
    // https://zendev.com/2018/06/07/async-data-options-in-vue-nuxt.html
    return axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        // console.log('data', res)
        return { people: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: e })
      })
  },
  data () {
    return {
      people: []
    }
  },
  head () {
    return {
      title: 'Nuxt Test: Async-API',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'My custom description' } // If you remove this description, or comment it out, the page will use the description in nuxt.config.js
      ]
    }
  },
}
</script>
