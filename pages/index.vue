<template>
  <div>
    <Hero />
    <TopContent />
    <Video />
    <MiddleContent
      @openModal="modalOpen"
    />
    <BottomContent />
    <!-- <FormContainer /> -->
    <Modal
      modal-title="My modal title"
      :success="success"
      :modal-active="modal"
      @modalClose="closeModal"
      @openModal="modalOpen"
      @fixBody="fixBody"
    >
      <template slot="activator">
        <div>
          <p>
            {{ activatorMessage }}
            <span class="icon" />
          </p>
        </div>
      </template>
      <template slot="content">
        <Form
          v-if="!success"
          ref="form"
          site-key="6LcX7E8aAAAAAIPDg_xlnDNsCF0vdX3KKrBG3s4x"
          at-api="keyeKovmQLeCAOEJ3"
          @success="formSubmitted"
        />
        <Success
          v-if="success"
        />
      </template>
    </Modal>
  </div>
</template>

<script>
import Hero from '../components/Hero'
import TopContent from '../components/TopContent'
import MiddleContent from '../components/MiddleContent'
import Form from '../components/Forms/FormCollectionAT'
import Success from '../components/Forms/Success'
import Modal from '../components/UI/Modal'
import Video from '../components/UI/Video'
import BottomContent from '../components/BottomContent'

export default {
  name: 'Index',
  components: {
    Hero,
    TopContent,
    MiddleContent,
    Form,
    Modal,
    Success,
    Video,
    BottomContent,
  },
  data () {
    return {
      formOpen: false,
      success: false,
      activatorMessage: 'Get Rebate',
      modal: false,
    }
  },
  methods: {
    // openForm () {
    //   this.formOpen = !this.formOpen
    // },
    formSubmitted (data) {
      this.success = data
      this.activatorMessage = 'Success!'
    },
    modalOpen () {
      this.modal = true
      if (typeof dataLayer === 'object') {
        // eslint-disable-next-line no-undef
        dataLayer.push({
          event: 'genericEvent',
          eventCat: 'form engagement',
          eventAction: 'button click',
          eventLabel: 'Get Rebate',
        })
      }
      document.body.style.overflowY = 'hidden'
      // this.$refs.form.focus()
    },
    closeModal () {
      this.modal = false
      document.body.style.overflow = 'scroll'
      // this.$refs.form.focus()
    },
    fixBody (data) {
      if (data) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  head () {
    return {
      title: 'Hidden Valley Ranch | Love At First Dip',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Make your already-great menu items even more loved with the one thing that elevates the flavor like nothing else: Hidden Valley Ranch®.' }, // If you remove this description, or comment it out, the page will use the description in nuxt.config.js
        { property: 'og:site_name', content: 'Hidden Valley Ranch' },
        { property: 'og:title', content: 'Hidden Valley Ranch | Love At First Dip' },
        { property: 'og:description', content: 'Make your already-great menu items even more loved with the one thing that elevates the flavor like nothing else: Hidden Valley Ranch®.' },
        { property: 'og:image', content: this.hostname + '/img/OriginalRanch-ProductLockup@2x.png' }
      ]
    }
  }
}
</script>
