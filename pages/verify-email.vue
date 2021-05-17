<template>
  <div class="py-4 px-8">
    <div class="h-24 flex items-center justify-center">
      <p class="text-3xl font-semibold">Email Verification</p>
    </div>
    <spinner v-if="busy" class="mx-auto" />
    <div v-else>
      <p class="mb-4 text-center font-semibold">
        Check you email inbox for a verification link to continue.
      </p>
      <button
        class="mx-auto py-2 px-4 block rounded-md bg-pink-500 ring-pink-500 hover:bg-pink-600 focus:bg-pink-600 focus:ring-2 transition focus:outline-none"
        @click="resendVerification"
      >
        Resend Verification Email
      </button>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Widgets/Spinner.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { Spinner },
  layout: 'auth',
  middleware: ['isVerified'],
  computed: {
    ...mapGetters({
      busy: 'email/busy'
    })
  },
  created() {
    this.handleUrl();
  },
  methods: {
    ...mapActions({
      resendVerification: 'email/resendVerification',
      verifyEmail: 'email/verifyEmail'
    }),
    handleUrl() {
      const verificationUrl = this.$route.query.verificationUrl;

      if (!verificationUrl) return;

      this.verifyEmail(verificationUrl);
    }
  }
};
</script>
