<template>
  <div class="py-4 px-8">
    <p class="mb-2 py-1 text-lg font-semibold border-b border-gray-700">
      Profile Information
    </p>
    <form autocomplete="off" @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block leading-7">Name</label>
        <input
          id="name"
          v-model="data.name"
          type="text"
          placeholder="Enter your name"
          required
          class="py-2 px-4 block w-full bg-gray-700 border-2 border-gray-900 outline-none ring-pink-500 focus:ring-2 transition rounded-md"
        />
      </div>
      <button
        class="mt-4 ml-auto py-2 px-4 block text-white focus:outline-none rounded-md shadow-md transition"
        :class="{
          'bg-gray-700 pointer-events-none': !changed,
          'pointer-events-none': busy,
          'ring-pink-500 bg-pink-500 hover:bg-pink-600 focus:bg-pink-600 focus:ring-2': changed
        }"
        :disabled="!changed"
      >
        <spinner v-if="busy" class="mx-auto" />
        <span v-else>Update Profile</span>
      </button>
    </form>
  </div>
</template>

<script>
import Spinner from '@/components/Widgets/Spinner.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { Spinner },
  layout: 'profile',
  middleware: ['isVerified'],
  data() {
    return {
      changed: false,
      data: {
        name: this.$auth.user.name
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'authentication/busy'
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
  mounted() {
    this.listenChanges();
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      saveChanges: 'authentication/update',
      clearServerErrors: 'authentication/clearErrors'
    }),
    listenChanges() {
      if (this.data.name === this.$auth.user.name) {
        return (this.changed = false);
      }

      this.changed = true;
    },
    submitForm() {
      this.saveChanges(this.data).then(() => this.listenChanges());
    }
  }
};
</script>
