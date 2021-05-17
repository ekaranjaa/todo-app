<template>
  <div>
    <div class="h-24 flex items-center justify-center">
      <p class="text-3xl font-semibold">Reset Password</p>
    </div>
    <form autocomplete="off" class="py-4 px-8" @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="password" class="block leading-7">New Password</label>
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
      </div>
      <div class="mb-4">
        <label for="confirmPassword" class="block leading-7"
          >Confirm Password</label
        >
        <input
          id="confirmPassword"
          v-model="data.password_confirmation"
          type="password"
          placeholder="Enter your password again"
          required
          class="py-2 px-4 block w-full bg-gray-700 border-2 border-gray-900 outline-none ring-pink-500 focus:ring-2 transition rounded-md"
        />
      </div>
      <button
        class="mt-6 py-2 px-4 block w-full text-white ring-pink-500 bg-pink-500 hover:bg-pink-600 focus:bg-pink-600 focus:ring-2 focus:outline-none rounded-md shadow-md transition"
        :class="{ 'pointer-events-none': busy }"
        :disabled="busy"
      >
        <spinner v-if="busy" class="mx-auto" />
        <span v-else> Reset Password </span>
      </button>
    </form>
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
        email: null,
        token: null,
        password: null,
        password_confirmation: null
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
      resetPassword: 'authentication/resetPassword',
      clearServerErrors: 'authentication/clearErrors'
    }),
    submitForm() {
      this.resetPassword(this.data);
    }
  }
};
</script>
