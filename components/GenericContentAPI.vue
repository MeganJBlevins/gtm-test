<template>
  <div>
    <ul>
      <li v-for="(post, index) in posts" :key="index">
        <h3>{{ post.title }}</h3>
        <article>{{ post.body }}</article>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  // This is a generic component using a content api as an example,

  name: 'GenericContentAPI',
  data () {
    return {
      posts: {}
    }
  },
  created () {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((x) => {
        // return { title: res.data.title }
        this.posts = x.data
        console.log('posts', this.posts)
      })
      .catch((e) => {
        this.error({ statusCode: 404, message: 'Post not found' })
      })
  }
}
</script>
