<template>
  <div>
    <div class="h-24 flex items-center justify-center">
      <p class="text-3xl font-semibold">Reset Password</p>
    </div>
    <form autocomplete="off" class="py-4 px-8" @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="email" class="block leading-7">Email address</label>
        <input
          id="email"
          v-model="data.email"
          type="email"
          placeholder="Enter your email"
          required
          class="py-2 px-4 block w-full bg-gray-700 border-2 border-gray-900 outline-none ring-pink-500 focus:ring-2 transition rounded-md"
          :class="{
            'border-red-500':
              errors.email || (serverErrors && serverErrors.email)
          }"
        />
        <div class="text-sm text-red-500">
          <span v-if="errors.email">{{ errors.email }}</span>
          <span v-if="serverErrors && serverErrors.email">
            {{ serverErrors.email[0] }}
          </span>
        </div>
      </div>
      <button
        class="mt-6 py-2 px-4 block w-full text-white ring-pink-500 bg-pink-500 hover:bg-pink-600 focus:bg-pink-600 focus:ring-2 focus:outline-none rounded-md shadow-md transition"
        :class="{ 'pointer-events-none': busy }"
        :disabled="busy"
      >
        <spinner v-if="busy" class="mx-auto" />
        <span v-else> Proceed </span>
      </button>
    </form>
    <div class="mb-4 py-2 px-8">
      <nuxt-link
        to="/login"
        class="block text-sm text-center text-pink-500 hover:underline focus:underline transition focus:outline-none"
      >
        Back to Login
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '../components/Widgets/Spinner.vue';

export default {
  name: 'Login',
  components: { Spinner },
  auth: false,
  layout: 'auth',
  data() {
    return {
      data: {
        email: null
      },
      errors: {
        email: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'authentication/busy',
      serverErrors: 'authentication/errors'
    })
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      forgotPassword: 'authentication/forgotPassword',
      clearServerErrors: 'authentication/clearErrors'
    }),
    clearErrors() {
      for (const error in this.errors) {
        this.errors[error] = null;
      }
      this.clearServerErrors();
    },
    validate() {
      let valid = true;
      const re = /\S+@\S+\.\S+/;
      this.clearErrors();

      if (!re.test(this.data.email)) {
        this.errors.email = 'Invalid email address';
        valid = false;
      }

      return valid;
    },
    submitForm() {
      const valid = this.validate();

      if (!valid) return;

      this.forgotPassword(this.data);
    }
  }
};
</script>
