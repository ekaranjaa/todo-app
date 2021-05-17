<template>
  <div>
    <div class="h-24 flex items-center justify-center">
      <p class="text-3xl font-semibold">Sign In</p>
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
      <div class="mb-4">
        <label for="password" class="block leading-7">Password</label>
        <input
          id="password"
          v-model="data.password"
          type="password"
          placeholder="Enter your password"
          required
          class="py-2 px-4 block w-full bg-gray-700 border-2 border-gray-900 outline-none ring-pink-500 focus:ring-2 transition rounded-md"
          :class="{
            'border-red-500': serverErrors && serverErrors.password
          }"
        />
        <div class="text-sm text-red-500">
          <span v-if="serverErrors && serverErrors.password">
            {{ serverErrors.password[0] }}
          </span>
        </div>
        <nuxt-link
          to="/forgot-password"
          class="mt-2 block text-right text-sm text-pink-500 hover:underline focus:underline focus:outline-none"
        >
          Forgot password?
        </nuxt-link>
      </div>
      <button
        class="mt-6 py-2 px-4 block w-full text-white ring-pink-500 bg-pink-500 hover:bg-pink-600 focus:bg-pink-600 focus:ring-2 focus:outline-none rounded-md shadow-md transition"
        :class="{ 'pointer-events-none': busy }"
        :disabled="busy"
      >
        <spinner v-if="busy" class="mx-auto" />
        <span v-else> Sign In </span>
      </button>
    </form>
    <div class="py-2 px-8">
      <div class="mb-6 relative border-b border-gray-900">
        <div
          class="h-8 w-8 leading-8 text-center absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-gray-500 bg-gray-800 rounded-full"
        >
          OR
        </div>
      </div>
      <a
        href="http://localhost:8001/api/auth/google"
        class="py-2 px-4 flex items-center justify-center w-full text-gray-800 ring-pink-500 bg-gray-300 hover:bg-gray-200 focus:bg-gray-200 focus:ring-2 focus:outline-none rounded-md shadow-md transition"
      >
        <div class="mr-2 h-6 w-6">
          <google-icon />
        </div>
        Continue with Google
      </a>
      <div class="my-6 text-sm flex items-center justify-center">
        <p class="mr-2 text-gray-500">Don't have an account?</p>
        <nuxt-link
          to="/register"
          class="text-pink-500 hover:underline focus:underline transition focus:outline-none"
        >
          Register
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GoogleIcon from '@/components/Icons/GoogleIcon.vue';
import Spinner from '../components/Widgets/Spinner.vue';

export default {
  name: 'Login',
  components: { GoogleIcon, Spinner },
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      data: {
        email: null,
        password: null
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
      login: 'authentication/login',
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

      this.login(this.data);
    }
  }
};
</script>
