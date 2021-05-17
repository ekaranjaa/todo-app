<template>
  <nav
    class="px-8 h-14 flex items-center border-b border-gray-700 overflow-x-auto overflow-y-hidden"
  >
    <nuxt-link
      :to="`/?mode=daily&date=${date}`"
      class="px-6 h-14 flex items-center hover:text-pink-500 focus:text-pink-500 font-semibold focus:outline-none transition"
      :class="{
        'border-b-2 border-pink-500 text-pink-500': $route.name === 'home'
      }"
    >
      Home
    </nuxt-link>
    <nuxt-link
      to="/profile"
      class="px-6 h-14 flex items-center hover:text-pink-500 focus:text-pink-500 font-semibold focus:outline-none transition"
      :class="{
        'border-b-2 border-pink-500 text-pink-500': $route.name === 'profile'
      }"
    >
      Profile
    </nuxt-link>
    <nuxt-link
      to="/profile/account"
      class="px-6 h-14 flex items-center font-semibold hover:text-pink-500 focus:text-pink-500 focus:outline-none transition"
      :class="{
        'border-b-2 border-pink-500 text-pink-500':
          $route.name === 'profile-account'
      }"
    >
      Account
    </nuxt-link>
    <nuxt-link
      to="/profile/password"
      class="px-6 h-14 flex items-center font-semibold hover:text-pink-500 focus:text-pink-500 focus:outline-none transition"
      :class="{
        'border-b-2 border-pink-500 text-pink-500':
          $route.name === 'profile-password'
      }"
    >
      Password
    </nuxt-link>
  </nav>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Navbar',
  computed: {
    date() {
      return moment().format('YYYY-MM-DD');
    }
  },
  methods: {
    genAvatar(name) {
      const avatar = name.charAt(0);
      return avatar.toUpperCase();
    }
  }
};
</script>
