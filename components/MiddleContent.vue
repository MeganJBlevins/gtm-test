<template>
  <section id="MiddleContent" class="middle-content">
    <div class="middle-content__container">
      <img class="logo" src="img/HiddenValley-Logo-1074x600.png" alt="Hidden Valley Ranch Logo">
      <h1>Here’s even more to love: savings.</h1>
      <button
        class="button"
        @click="openModal"
      >
        Get Rebate
      </button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'MiddleContent',
  data () {
    return {
      modal: false,
    }
  },
  methods: {
    openModal () {
      this.modal = true
      this.$emit('openModal', true)
    }
  }
}
</script>
