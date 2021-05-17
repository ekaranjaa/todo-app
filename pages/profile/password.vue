<template>
  <div class="py-4 px-8">
    <p class="mb-2 py-1 text-lg font-semibold border-b border-gray-700">
      Password Management
    </p>
    <form autocomplete="off" @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="password" class="block leading-7">Current Password</label>
        <input
          id="password"
          v-model="data.current_password"
          type="password"
          placeholder="Enter your current password"
          required
          class="py-2 px-4 block w-full bg-gray-700 border-2 border-gray-900 outline-none ring-pink-500 focus:ring-2 transition rounded-md"
          :class="{
            'border-red-500': serverErrors && serverErrors.current_password
          }"
        />
        <div class="text-sm text-red-500">
          <span v-if="serverErrors && serverErrors.current_password">
            {{ serverErrors.current_password[0] }}
          </span>
        </div>
        <nuxt-link
          to="/forgot-password"
          class="mt-2 block text-right text-sm text-pink-500 hover:underline focus:underline focus:outline-none"
        >
          Forgot password?
        </nuxt-link>
      </div>
      <div class="mb-4">
        <label for="newPassword" class="block leading-7">Create Password</label>
        <input
          id="newPassword"
          v-model="data.password"
          type="password"
          placeholder="Enter new password"
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
        <label for="passwordConfirmation" class="block leading-7">
          Confirm Password
        </label>
        <input
          id="passwordConfirmation"
          v-model="data.password_confirmation"
          type="password"
          class="py-2 px-4 block w-full bg-gray-700 border-2 border-gray-900 outline-none ring-pink-500 focus:ring-2 transition rounded-md"
          placeholder="Enter new password again"
          required
        />
      </div>
      <button
        class="mt-6 ml-auto py-2 px-4 block text-white focus:outline-none rounded-md shadow-md transition"
        :class="{
          'bg-gray-700 pointer-events-none': !ready,
          'pointer-events-none': busy,
          'ring-pink-500 bg-pink-500 hover:bg-pink-600 focus:bg-pink-600 focus:ring-2': ready
        }"
        :disabled="!ready || busy"
      >
        <spinner v-if="busy" class="mx-auto" />
        <span v-else>Change Password</span>
      </button>
    </form>
  </div>
</template>

<script>
import Spinner from '@/components/Widgets/Spinner.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Spinner
  },
  layout: 'profile',
  middleware: ['isVerified'],
  data() {
    return {
      ready: false,
      data: {
        current_password: null,
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
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler() {
        this.listenChanges();
      }
    }
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      changePassword: 'authentication/updatePassword',
      clearServerErrors: 'authentication/clearErrors'
    }),
    listenChanges() {
      if (
        this.data.current_password &&
        this.data.password &&
        this.data.password_confirmation
      ) {
        return (this.ready = true);
      }

      this.ready = false;
    },
    submitForm() {
      this.changePassword(this.data).then(() => {
        if (this.serverErrors) return;

        this.data.current_password = null;
        this.data.password = null;
        this.data.password_confirmation = null;
      });
    }
  }
};
</script>
