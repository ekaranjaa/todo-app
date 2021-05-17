<template>
  <footer
    class="px-8 sticky top-full md:relative flex items-center border-t border-gray-700"
    :class="{
      'py-2 justify-between': $auth.loggedIn,
      'py-4 justify-center': !$auth.loggedIn
    }"
  >
    <p class="text-sm text-gray-500">Todo App &copy; 2021</p>
    <button
      v-if="$auth.loggedIn"
      class="py-2 px-4 block rounded-md ring-pink-500 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:outline-none transition"
      :class="{ 'pointer-events-none': busy }"
      :disabled="busy"
      @click="logout"
    >
      <spinner v-if="busy" />
      <div v-else class="flex items-center">
        <div class="mr-2 h-5 w-5">
          <logout-icon />
        </div>
        <p class="text-sm">Logout</p>
      </div>
    </button>
  </footer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LogoutIcon from '../Icons/LogoutIcon.vue';
import Spinner from '../Widgets/Spinner.vue';

export default {
  name: 'Footer',
  components: { LogoutIcon, Spinner },
  computed: {
    ...mapGetters({
      busy: 'authentication/busy'
    })
  },
  methods: {
    ...mapActions({
      logout: 'authentication/logout'
    })
  }
};
</script>
