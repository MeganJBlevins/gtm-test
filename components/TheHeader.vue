<template>
  <header>
    <div class="top-bar" />
    <div class="header__container">
      <div class="space" />
      <Logo />
      <div class="header__grey-background" />
    </div>
  </header>
</template>

<script>
import Logo from './UI/Logo.vue'
export default {
  name: 'TheHeader',
  components: {
    Logo
  }
}
</script>
