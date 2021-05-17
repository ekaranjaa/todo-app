<template>
  <div class="py-4 px-8">
    <div class="mb-4">
      <p class="mb-2 py-1 text-lg font-semibold border-b border-gray-700">
        Account Management
      </p>
      <form autocomplete="off" @submit.prevent="">
        <div class="mb-4">
          <label for="email" class="block leading-7">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            :value="$auth.user.email"
            readonly
            required
            class="py-2 px-4 block w-full bg-gray-700 border-2 border-gray-900 outline-none transition rounded-md"
          />
        </div>
      </form>
    </div>
    <div class="mb-4">
      <p class="mb-2 py-1 text-lg font-semibold border-b border-gray-700">
        Link Accounts
      </p>
      <div class="py-2">
        <a
          v-if="$auth.user.provider !== 'google'"
          href="http://localhost:8001/api/auth/google"
          class="py-2 px-4 flex items-center justify-center w-full text-gray-800 ring-pink-500 bg-gray-300 hover:bg-gray-200 focus:bg-gray-200 focus:ring-2 focus:outline-none rounded-md shadow-md transition"
        >
          <div class="mr-2 h-6 w-6">
            <google-icon />
          </div>
          Link Google Account
        </a>
        <div v-else class="flex items-center">
          <div class="mr-2 h-6 w-6">
            <google-icon />
          </div>
          <p>Google account linked</p>
        </div>
      </div>
    </div>
    <div>
      <p
        class="mb-2 py-1 text-red-500 text-lg font-semibold border-b border-gray-700"
      >
        Danger Zone
      </p>
      <button
        class="mt-4 py-2 px-4 block w-full text-white ring-gray-500 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 focus:ring-2 focus:outline-none rounded-md shadow-md transition"
        @click="deleteAccount"
      >
        Delete Account
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GoogleIcon from '@/components/Icons/GoogleIcon.vue';

export default {
  components: { GoogleIcon },
  layout: 'profile',
  middleware: ['isVerified'],
  data() {
    return {
      data: {
        email: this.$auth.user.email
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
      deleteAccount: 'authentication/delete',
      clearServerErrors: 'authentication/clearErrors'
    })
  }
};
</script>
