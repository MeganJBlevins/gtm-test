<template>
  <section class="lead-collection">
    <div class="lead-collection-form-wraper form-wrapper">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          v-if="!submitted"
          class="lead-collection-form form"
          novalidate
          @submit.prevent="handleSubmit(leadSubmit)"
        >
          <label for="email">
            Enter your email address
          </label>
          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
          >
            <input
              id="email"
              ref="email"
              v-model="form.email"
              name="email"
              type="email"
              required
            >
            <transition name="form-error">
              <span
                v-show="errors[0]"
                class="form-error"
              >
                {{ errors[0] }}
              </span>
            </transition>
          </validation-provider>
          <vue-recaptcha
            ref="invisibleRecaptcha"
            size="invisible"
            :sitekey="siteKey"
            @verify="onVerify"
            @expired="onExpired"
          />
          <button type="submit">
            <span v-if="!submitting">
              Submit
            </span>
            <span v-if="submitting">
              Submitting...
            </span>
          </button>
        </form>
      </ValidationObserver>
      <transition name="form-submit">
        <div
          v-if="submitted"
          :class="{
            'lead-collection-form__mask form-mask': true,
            'lead-collection-form__mask--success form-mask--success': submitted
          }"
        >
          <div>
            Thanks!
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
// import VeeValidate from 'vee-validate'
import VueRecaptcha from 'vue-recaptcha'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { ValidationProvider, ValidationObserver, extend, setInteractionMode } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
extend('email', email)
extend('required', {
  ...required,
  message: 'This field is required'
})
// https://logaretm.github.io/vee-validate/guide/interaction-and-ux.html#interaction-modes
setInteractionMode('passive')

Vue.use(VueAxios, axios)

// Vue.use(VeeValidate, {
//   classes: true,
//   aria: true,
//   classNames: {
//     valid: 'is-valid',
//     invalid: 'is-invalid'
//   }
// })

export default {
  name: 'LeadCollection',
  components: {
    VueRecaptcha,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    dbCollection: {
      type: String,
      required: true,
      default: 'Nuxt Base Collection Test'
    },
    siteKey: {
      type: String,
      required: true,
      default: '6Le-940UAAAAAAgnWJwbfxpTOA4DQ3e-gQ7akxOC'
    },
    mailTo: {
      type: String,
      required: false,
      default: ''
    },
    mailFrom: {
      type: String,
      required: false,
      default: 'noreply@marlinnetwork.com'
    }
  },
  data () {
    return {
      emailIsValid: false,
      submitAttempted: false,
      form: {
        email: ''
      },
      error: {
        email: 'Please enter a valid email address'
      },
      submitting: false, // submit first state
      submitted: false, // submit final state
      formHash: this.generatedUID(),
    }
  },
  created () {
    // console.log(this.siteKey)
  },
  methods: {
    generatedUID () {
      // I generate the UID from two parts here
      // to ensure the random number provide enough bits.
      let firstPart = (Math.random() * 46656) | 0
      let secondPart = (Math.random() * 46656) | 0
      firstPart = ('000' + firstPart.toString(36)).slice(-3)
      secondPart = ('000' + secondPart.toString(36)).slice(-3)
      return firstPart + secondPart
    },
    leadSubmit (e) {
      // e.preventDefault()
      // const value = e.currentValue
      // const value = JSON.stringify(this)
      // const email = this.$refs.email.value
      // const email = this.form.email
      this.$gtmEvent('Lead Collection', 'submit attempt', this.formHash)
      this.submitAttempted = true
      // this.$validator.validate().then((valid) => {
      //   if (valid) {
      this.$refs.invisibleRecaptcha.execute()
      this.submitting = true
      //   }
      // })
    },
    onVerify (response) {
      // console.log('Verify: ' + response)
      this.$gtmEvent('Lead Collection', 'ReCaptcha verified', this.formHash)
      this.submit()
    },
    onExpired () {
      console.log('Expired')
      this.$gtmEvent('Lead Collection', 'ReCaptcha expired', this.formHash)
    },
    submit () {
      console.log('submitting', this)
      this.postMessage()
    },
    postMessage () {
      this.axios.post(
        '//emaillog.marlinnetwork.com/Api/LogForm/' + this.dbCollection,
        JSON.stringify(this.form),
        { responseType: 'json', headers: { 'Content-Type': 'application/json' } }
      ).then((response) => {
        this.$gtmEvent('Lead Collection', 'success db', this.formHash)
        if (this.mailTo.length > 0) {
          this.postEmail()
        } else {
          this.success()
        }
        console.log('data success')
      }, (error) => {
        // error callback
        console.error('data error')
        this.$gtmEvent('Lead Collection', 'db error: ' + error.message, this.formHash)
      })
    },
    postEmail () {
      const emailData = {
        from: this.mailFrom,
        replyto: this.form.email,
        to: this.mailTo,
        subject: 'Nuxt Test Form',
        html: '<h1>Next Test Lead Form</h1><br>Email: ' + this.form.email
      }
      this.axios.post(
        '//emaillog.marlinnetwork.com/Api/SendMessage',
        JSON.stringify(emailData),
        { responseType: 'json', headers: { 'Content-Type': 'application/json' } }
      ).then((response) => {
        this.$gtmEvent('Lead Collection', 'success mail', this.formHash)
        this.success()
        console.log('email success')
      }, (error) => {
        // error callback
        console.error('email error')
        this.$gtmEvent('Lead Collection', 'mail error: ' + error.message, this.formHash)
      })
    },
    success () {
      this.submitting = false
      this.submitted = true
    }
  }
}
</script>

<style lang="scss" scoped>
.form-error-enter-active, .form-error-leave-active {
  transition: opacity .5s;
}
.form-error-enter, .form-error-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.form-submit-enter-active, .form-submit-leave-active {
  transition: opacity .5s;
}
.form-submit-enter, .form-submit-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
