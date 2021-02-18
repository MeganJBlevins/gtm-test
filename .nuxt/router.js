import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0bb9c2c3 = () => interopDefault(import('../pages/404.vue' /* webpackChunkName: "pages/404" */))
const _6d41be5b = () => interopDefault(import('../pages/about/index.vue' /* webpackChunkName: "pages/about/index" */))
const _1f6f4197 = () => interopDefault(import('../pages/async-api/index.vue' /* webpackChunkName: "pages/async-api/index" */))
const _2809d49d = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/404",
    component: _0bb9c2c3,
    name: "404"
  }, {
    path: "/about",
    component: _6d41be5b,
    name: "about"
  }, {
    path: "/async-api",
    component: _1f6f4197,
    name: "async-api"
  }, {
    path: "/",
    component: _2809d49d,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
