<template>
  <section>
    <div class="form-collection">
      <div class="form-collection-form-wraper form-wrapper">
        <p>All fields are required.</p>
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <form
            v-if="!submitted"
            class="form-collection-form form"
            novalidate
            @submit.prevent="handleSubmit(leadSubmit)"
          >
            <fieldset>
              <label for="fname">
                First Name
              </label>
              <validation-provider
                v-slot="{ errors }"
                rules="required|alpha_spaces"
              >
                <transition name="form-error">
                  <p
                    v-show="errors[0]"
                    class="form-error"
                  >
                    <span class="error-icon" />
                    Please enter a First Name.
                  </p>
                </transition>
                <div
                  :class="{ 'form-area': true, 'input-error': errors.length > 0 }"
                >
                  <div class="icon user" />
                  <input
                    id="fname"
                    ref="fname"
                    v-model="form.fname"
                    name="fname"
                    type="text"
                    required
                    @focus="start()"
                  >
                </div>
              </validation-provider>
            </fieldset>
            <fieldset>
              <label for="fname">
                Last Name
              </label>
              <validation-provider
                v-slot="{ errors }"
                rules="required|alpha_spaces"
              >
                <transition name="form-error">
                  <p
                    v-show="errors[0]"
                    class="form-error"
                  >
                    <span class="error-icon" />
                    Please enter a Last Name.
                  </p>
                </transition>
                <div
                  :class="{ 'form-area': true, 'input-error': errors.length > 0 }"
                >
                  <div class="icon user" />
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
                </div>
              </validation-provider>
            </fieldset>
            <fieldset>
              <label for="operation">
                Operation Name
              </label>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
              >
                <transition name="form-error">
                  <p
                    v-show="errors[0]"
                    class="form-error"
                  >
                    <span class="error-icon" />
                    Please enter an Operation name.
                  </p>
                </transition>
                <div
                  :class="{ 'form-area': true, 'input-error': errors.length > 0 }"
                >
                  <div class="icon operation" />
                  <input
                    id="operation"
                    ref="operation"
                    v-model="form.operation"
                    name="operation"
                    type="text"
                    required
                    :class="{ 'input-error': errors.length > 0 }"
                    @focus="start()"
                  >
                </div>
              </validation-provider>
            </fieldset>
            <fieldset>
              <label for="street">
                Street Address
              </label>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
              >
                <transition name="form-error">
                  <p
                    v-show="errors[0]"
                    class="form-error"
                  >
                    <span class="error-icon" />
                    Please enter a street address.
                  </p>
                </transition>
                <div
                  :class="{ 'form-area': true, 'input-error': errors.length > 0 }"
                >
                  <div class="icon location" />
                  <input
                    id="street"
                    ref="street"
                    v-model="form.street"
                    name="street"
                    type="text"
                    required
                    :class="{ 'input-error': errors.length > 0 }"
                    @focus="start()"
                  >
                </div>
              </validation-provider>
            </fieldset>
            <fieldset>
              <label for="zip">
                ZIP
              </label>
              <validation-provider
                v-slot="{ errors }"
                rules="numeric|required|length:5"
              >
                <transition name="form-error">
                  <p
                    v-show="errors[0]"
                    class="form-error"
                  >
                    <span class="error-icon" />
                    Please enter a valid ZIP code.
                  </p>
                </transition>
                <div
                  :class="{ 'form-area': true, 'input-error': errors.length > 0 }"
                >
                  <div class="icon zip" />
                  <input
                    id="zip"
                    ref="zip"
                    v-model="form.zip"
                    name="zip"
                    type="text"
                    required
                    :class="{ 'input-error': errors.length > 0 }"
                    @focus="start()"
                  >
                </div>
              </validation-provider>
            </fieldset>
            <fieldset>
              <label for="tel">
                Phone number
              </label>
              <validation-provider
                v-slot="{ errors }"
                :rules="{ required: true, regex: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/ }"
              >
                <transition name="form-error">
                  <p
                    v-show="errors[0]"
                    class="form-error"
                  >
                    <span class="error-icon" />
                    Please enter a valid phone number.
                  </p>
                </transition>
                <div
                  :class="{ 'form-area': true, 'input-error': errors.length > 0 }"
                >
                  <div class="icon phone" />
                  <input
                    id="tel"
                    ref="tel"
                    v-model="form.tel"
                    v-mask="'(###)###-####'"
                    name="tel"
                    type="tel"
                    placeholder="(###)###-####"
                    required
                    :class="{ 'input-error': errors.length > 0 }"
                    @focus="start()"
                  >
                </div>
              </validation-provider>
            </fieldset>
            <fieldset>
              <label for="email">
                Email address
              </label>
              <validation-provider
                v-slot="{ errors }"
                rules="required|email"
              >
                <transition name="form-error">
                  <p
                    v-show="errors[0]"
                    class="form-error"
                  >
                    <span class="error-icon" />
                    Please enter a valid email address.
                  </p>
                </transition>
                <div
                  :class="{ 'form-area': true, 'input-error': errors.length > 0 }"
                >
                  <div class="icon email" />
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
                </div>
              </validation-provider>
            </fieldset>
            <fieldset class="radio">
              <label for="preferred">
                Select your preferred contact method.
              </label>
              <label class="radio-button">
                <input
                  v-model="form.preferred"
                  type="radio"
                  name="preferred"
                  value="Email"
                  checked="checked"
                >Email
                <span class="checkmark" />
              </label>
              <label class="radio-button">
                <input
                  v-model="form.preferred"
                  type="radio"
                  name="preferred"
                  value="Phone"
                >Phone
                <span class="checkmark" />
              </label>
            </fieldset>
            <fieldset>
              <vue-recaptcha
                class="recaptcha-checkbox"
                :sitekey="siteKey"
                @verify="onVerify"
              />
            </fieldset>
            <div class="submit-button">
              <button
                id="form-submit"
                type="submit"
                @click="submitAttempt"
              >
                <span v-if="!submitting">
                  Submit
                </span>
                <span v-if="submitting">
                  Submitting...
                </span>
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </section>
</template>

<script>
import Airtable from 'airtable'
import Vue from 'vue'
// import VeeValidate, { Validator } from 'vee-validate'
import VueRecaptcha from 'vue-recaptcha'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { VueMaskDirective } from 'v-mask'

import { ValidationProvider, ValidationObserver, extend, setInteractionMode } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, email, alpha, alpha_spaces, length, regex, numeric } from 'vee-validate/dist/rules'
extend('alpha', alpha)
extend('numeric', numeric)
extend('alpha_spaces', alpha_spaces)
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
Vue.directive('mask', VueMaskDirective)

export default {
  name: 'FormCollectionAT',
  components: {
    VueRecaptcha,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    dbCollection: {
      type: String,
      // required: true,
      default: 'Nuxt Base Collection Test'
    },
    siteKey: {
      type: String,
      default: '6LcX7E8aAAAAAIPDg_xlnDNsCF0vdX3KKrBG3s4x'
    },
    mailTo: {
      type: String,
      required: false,
      default: ''
    },
    mailFrom: {
      type: String,
      required: false,
      default: 'devops@thealchemediaproject.com'
    },
    atApi: {
      type: String,
      required: false,
      default: 'keyeKovmQLeCAOEJ3'
    },
    atBaseKey: {
      type: String,
      required: false,
      default: 'appVxXTwyz8O2Uhyl'
    }
  },
  data () {
    return {
      form: {
        fname: '',
        lname: '',
        operation: '',
        street: '',
        zip: '',
        tel: '',
        email: '',
        preferred: 'Email'
      },
      emailIsValid: false,
      submitAttempted: false,
      formTitle: 'Hidden Valley Lead Generation Form',
      submitting: false, // submit first state
      submitted: false, // submit final state
      formHash: 'Hidden Valley Lead Gen', // was generate Guid
      formFocusCount: 0,
      gtmCat: 'form engagement',
      recapVerified: false
    }
  },
  methods: {
    async submitAttempt () {
      const isValid = await this.$refs.observer.validate()
      this.$gtmEvent(this.gtmCat, 'submit attempt', this.formHash)
      if (!isValid) {
        return
      }
      if (this.recapVerified) {
        this.submit()
      }
    },
    leadSubmit (e) {
      this.submitAttempted = true
      this.submitting = true
    },
    onVerify (response) {
      this.recapVerified = true
    },
    submit () {
      this.postMessage()
    },
    async postMessage () {
      const context = this
      const base = await new Airtable({ apiKey: this.atApi }).base(this.atBaseKey)
      base('Leads').create({
        fname: this.form.fname,
        lname: this.form.lname,
        operation: this.form.operation,
        street: this.form.street,
        zip: this.form.zip,
        tel: this.form.tel,
        email: this.form.email,
        preferred: this.form.preferred
      }, function (error, record) {
        if (error) {
          // TODO: Real Error ?
          alert('Form Error, please try e-mailing us instead.')
          context.$gtmEvent(context.gtmCat, 'submit error' + error.message, context.formHash)
          return false
        }
        context.$gtmEvent(context.gtmCat, 'submit success', context.formHash)
        context.success()
      })
    },
    success () {
      this.submitting = false
      this.submitted = true
      this.$emit('success', this.submitted)
    },
    onExpired () {
      // console.log('Expired')
      // this.$gtmEvent('Form Collection AT', 'ReCaptcha expired', this.formHash)
    },
    focus () {
      this.$refs.fname.focus()
    },
    start () {
      if (this.formFocusCount <= 0) {
        this.formFocusCount++
      }
    }
  }
}

</script>
