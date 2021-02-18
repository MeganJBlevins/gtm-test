<template>
  <section class="form-collection">
    <div class="form-collection-form-wraper form-wrapper">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          v-if="!submitted"
          class="form-collection-form form"
          novalidate
          @submit.prevent="handleSubmit(leadSubmit)"
        >
          <fieldset>
            <legend>Name</legend>
            <label for="fname">
              First name
            </label>
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha"
            >
              <input
                id="fname"
                ref="fname"
                v-model="form.fname"
                name="fname"
                type="text"
                required
                :class="{ 'input-error': errors.length > 0 }"
                @focus="start()"
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
            <label for="lname">
              Last name
            </label>
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha"
            >
              <input
                id="lname"
                ref="lname"
                v-model="form.lname"
                name="lname"
                type="text"
                required
                :class="{ 'input-error': errors.length > 0 }"
                @focus="start()"
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
          </fieldset>
          <fieldset>
            <legend>Contact Information</legend>
            <label for="email">
              Email address
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
                :class="{ 'input-error': errors.length > 0 }"
                @focus="start()"
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
            <label for="tel">
              Phone number
            </label>
            <validation-provider
              v-slot="{ errors }"
              :rules="{ required: true, regex: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/ }"
            >
              <input
                id="tel"
                ref="tel"
                v-model="form.tel"
                name="tel"
                type="tel"
                required
                :class="{ 'input-error': errors.length > 0 }"
                @focus="start()"
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
            <label for="state">
              State
            </label>
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha|length:2"
            >
              <input
                id="state"
                ref="state"
                v-model="form.state"
                name="state"
                type="text"
                required
                :class="{ 'input-error': errors.length > 0 }"
                @focus="start()"
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
          </fieldset>
          <fieldset>
            <legend>Opt-in</legend>
            <input
              id="check"
              ref="check"
              v-model="form.check"
              name="check"
              type="checkbox"
              required
              @focus="start()"
            >
            <label for="check">
              Affirmative
            </label>
          </fieldset>
          <fieldset>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <input
                id="one"
                v-model="form.radio"
                type="radio"
                value="One"
                name="radiog"
                required
                @focus="start()"
              >
              <label for="one">
                One
              </label>
              <input
                id="two"
                v-model="form.radio"
                type="radio"
                value="Two"
                name="radiog"
                @focus="start()"
              >
              <label for="two">
                Two
              </label>
              <transition name="form-error">
                <span
                  v-show="errors[0]"
                  class="form-error"
                >
                  {{ errors[0] }}
                </span>
              </transition>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha|length:1"
            >
              <select
                id="selection"
                v-model="form.select"
                required
                name="selection"
                @focus="start()"
              >
                <option disabled value="">
                  Please select one
                </option>
                <option>
                  A
                </option>
                <option>
                  B
                </option>
                <option>
                  C
                </option>
              </select>
              <transition name="form-error">
                <span
                  v-show="errors[0]"
                  class="form-error"
                >
                  {{ errors[0] }}
                </span>
              </transition>
            </validation-provider>
          </fieldset>
          <fieldset>
            <legend>Message</legend>
            <label for="message">
              Message
            </label>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <textarea
                id="message"
                ref="message"
                v-model="form.message"
                name="message"
                type="text"
                cols="30"
                rows="10"
                required
                :class="{ 'input-error': errors.length > 0 }"
                @focus="start()"
              />
              <transition name="form-error">
                <span
                  v-show="errors[0]"
                  class="form-error"
                >
                  {{ errors[0] }}
                </span>
              </transition>
            </validation-provider>
          </fieldset>
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
// import VeeValidate, { Validator } from 'vee-validate'
import VueRecaptcha from 'vue-recaptcha'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { ValidationProvider, ValidationObserver, extend, setInteractionMode } from 'vee-validate'
import { required, email, alpha, length, regex } from 'vee-validate/dist/rules'
extend('alpha', alpha)
extend('regex', regex)
extend('length', {
  ...length,
  message: 'This field has too many characters'
})
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

// const dict = {
//   custom: {
//     fname: {
//       required: () => 'The first name field is required.'
//     },
//     lname: {
//       required: () => 'The last name field is required.'
//     },
//     tel: {
//       required: () => 'The phone number field is required.',
//       regex: () => 'The phone number field is invalid, please enter a standard number.'
//     },
//     state: {
//       length: () => 'Please enter a standard two-digit state code.'
//     },
//     radiog: {
//       required: () => 'Please choose an option.'
//     },
//     selection: {
//       required: () => 'Please choose an option.'
//     }
//   }
// }

// Validator.localize('en', dict)

export default {
  name: 'FormCollection',
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
      default: 'noreply@seacuisine.com'
    }
  },
  data () {
    return {
      emailIsValid: false,
      submitAttempted: false,
      form: {
        check: false
      },
      formTitle: 'Nuxt Test Form',
      submitting: false, // submit first state
      submitted: false, // submit final state
      formHash: this.generatedUID(),
      formFocusCount: 0
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
      this.$gtmEvent('Form Collection', 'submit attempt', this.formHash)
      this.submitAttempted = true
      this.$refs.invisibleRecaptcha.execute()
      this.submitting = true
    },
    onVerify (response) {
      // console.log('Verify: ' + response)
      this.$gtmEvent('Form Collection', 'ReCaptcha verified', this.formHash)
      this.submit()
    },
    onExpired () {
      console.log('Expired')
      this.$gtmEvent('Form Collection', 'ReCaptcha expired', this.formHash)
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
        this.$gtmEvent('Form Collection', 'success db', this.formHash)
        if (this.mailTo.length > 0) {
          this.postEmail()
        } else {
          this.success()
        }
        console.log('data success')
      }, (error) => {
        // error callback
        console.error('data error')
        this.$gtmEvent('Form Collection', 'db error: ' + error.message, this.formHash)
      })
    },
    postEmail () {
      const emailContent = this.constructEmail()
      console.log(emailContent)
      this.axios.post(
        '//emaillog.marlinnetwork.com/Api/SendMessage',
        JSON.stringify(emailContent),
        { responseType: 'json', headers: { 'Content-Type': 'application/json' } }
      ).then((response) => {
        this.$gtmEvent('Form Collection', 'success mail', this.formHash)
        this.success()
        console.log('email success')
      }, (e) => {
        // error callback
        console.error('email error')
        this.$gtmEvent('Form Collection', 'mail error: ' + e.message, this.formHash)
      })
    },
    constructEmail () {
      // if (this.tagName == 'INPUT' && this.type !== 'submit' && this.type !== 'checkbox') {
      //   formData[this.name] = this.value;
      //   formHTML += this.name.replace('_', ' ').toUpperCase()+': '+this.value+'<br>';
      // }
      // else if (this.type == 'checkbox') {
      //   if ($(this).is(':checked')) {
      //     formData[this.name] = this.value + ": Checked";
      //     formHTML += this.name.replace('_', ' ').toUpperCase()+': '+this.value + ": Yes"+'<br>';
      //   }
      //   else {
      //     formData[this.name] = this.value + ": Not Checked";
      //     formHTML += this.name.replace('_', ' ').toUpperCase()+': '+this.value + ": No"+'<br>';
      //   }
      // }
      console.log('form', this.form)
      let constructedHtml = ''
      constructedHtml += '<h1>' + this.formTitle + '</h1>'
      for (const item in this.form) {
        constructedHtml += item + ': ' + this.form[item] + '<br>'
      }
      return {
        from: this.mailFrom,
        replyto: this.form.email,
        to: this.mailTo,
        subject: 'Nuxt Test Form',
        html: constructedHtml
      }
    },
    success () {
      this.submitting = false
      this.submitted = true
    },
    start () {
      if (this.formFocusCount <= 0) {
        this.$gtmEvent('Form Collection', 'started', this.formHash)
        this.formFocusCount++
      }
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
