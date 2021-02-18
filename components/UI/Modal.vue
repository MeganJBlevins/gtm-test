<template>
  <div>
    <transition name="fade">
      <div
        v-if="active"
        class="modal-wrapper"
        aria-modal="true"
        tabindex="-1"
        @click.self="close"
      />
    </transition>
    <div
      ref="modal"
      :class="{'modal': true, 'open' : active, 'success': success, 'shrink': scrolled}"
      :aria-label="modalTitle"
      aria-role="dialog"
      tabindex="0"
      @keyup.tab="checkTab"
    >
      <button
        ref="activator"
        type="button"
        class="modal__open"
        @click="activate"
      >
        <slot name="activator" />
      </button>
      <div class="modal-wrapper__inner">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Modal',
  props: {
    modalTitle: {
      type: String,
      default: 'Confirmation Dialog'
    },
    success: {
      type: Boolean,
      default: false
    },
    modalActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      windowHeight: this.css,
      active: this.modalActive,
      scrolled: false
    }
  },
  watch: {
    modalActive (newValue) {
      this.active = newValue
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    activate () {
      this.active = !this.active
      this.$emit('modalClose', this.active)
      this.focusInModal()
      this.$refs.modal.scrollTop = 0
      let action = 'collapse'
      if (this.active) {
        action = 'expand'
        this.$emit('fixBody', this.active)
        this.$emit('openModal', this.active)
        this.focusInModal()
        this.$refs.modal.scrollTop = 0
      } else {
        this.$emit('modalClose', this.active)
      }
      console.log('action: ' + action)
      if (typeof dataLayer === 'object') {
        // eslint-disable-next-line no-undef
        dataLayer.push({
          event: 'genericEvent',
          eventCat: 'form engagement',
          eventAction: action,
          eventLabel: 'Start Saving',
        })
      }
    },
    close () {
      this.active = false
      this.$emit('modalClose', this.active)
      this.focusReturn()
      console.log('action: collapse')
      if (typeof dataLayer === 'object') {
        // eslint-disable-next-line no-undef
        dataLayer.push({
          event: 'genericEvent',
          eventCat: 'form engagement',
          eventAction: 'collapse',
          eventLabel: 'Start Saving',
        })
      }
    },
    focusInModal () {
      const context = this
      Vue.nextTick().then(() => {
        if (typeof this.$refs.firstfocus !== 'undefined') {
          context.$refs.firstfocus.focus()
          console.log('worked')
        }
      })
    },
    focusReturn () {
      this.$refs.activator.focus()
    },
    checkTab (e) {
      console.log('checkTab', e)
    },
    onScroll () {
      // Get the current scroll position
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition <= 0) {
        this.scrolled = false
      } else {
        this.scrolled = true
      }
    }
  }
}
</script>
