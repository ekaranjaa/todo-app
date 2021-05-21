<template>
  <nav class="px-8 h-14 flex items-center border-b border-gray-700">
    <div class="mx-auto flex items-center">
      <nuxt-link
        :to="`?mode=daily&date=${dates.from}`"
        class="px-6 h-14 flex items-center font-semibold hover:text-pink-500 focus:text-pink-500 focus:outline-none transition"
        :class="{
          'border-b-2 border-pink-500 text-pink-500': mode === 'daily'
        }"
      >
        Day
      </nuxt-link>
      <nuxt-link
        :to="`?mode=weekly&from=${dates.from}&to=${dates.to}`"
        class="px-6 h-14 flex items-center font-semibold hover:text-pink-500 focus:text-pink-500 focus:outline-none transition"
        :class="{
          'border-b-2 border-pink-500 text-pink-500': mode === 'weekly'
        }"
      >
        Week
      </nuxt-link>
    </div>
    <nuxt-link
      v-if="$auth.loggedIn"
      to="/profile"
      :title="$auth.user.name"
      class="ring-pink-500 focus:ring-2 transition focus:outline-none rounded-full"
    >
      <div
        v-if="$auth.user.avatar"
        class="h-8 w-8 overflow-hidden rounded-full"
      >
        <img :src="$auth.user.avatar" :alt="$auth.user.name" />
      </div>
      <div
        v-else
        class="h-8 w-8 leading-8 text-center text-lg font-semibold text-white bg-gradient-to-br from-pink-500 to-pink-700 overflow-hidden rounded-full"
      >
        {{ genAvatar($auth.user.name) }}
      </div>
    </nuxt-link>
  </nav>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Navbar',
  computed: {
    mode() {
      const mode = this.$route.query.mode;
      if (!mode) return 'daily';
      return mode;
    },
    dates() {
      const from = moment().format('YYYY-MM-DD');
      const to = moment().add(6, 'days').format('YYYY-MM-DD');
      return { from, to };
    }
  },
  created() {
    this.setDate(this.dates.from);
  },
  methods: {
    setDate(d) {
      const { date, from } = this.$route.query;

      if (date || from) return;
      this.$router.push(`?mode=daily&date=${d}`);
    },
    genAvatar(name) {
      const avatar = name.charAt(0);
      return avatar.toUpperCase();
    }
  }
};
</script>
