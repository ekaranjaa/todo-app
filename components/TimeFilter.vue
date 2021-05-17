<template>
  <div class="mx-auto py-4 w-full flex items-center justify-between">
    <button
      v-if="mode === 'daily'"
      class="h-10 w-10 grid place-items-center ring-pink-500 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:outline-none rounded-full transition"
      :class="{ 'pointer-events-none': busy }"
      :disabled="busy"
      @click="prevDay"
    >
      <div class="h-2/3 w-2/3">
        <chevron-left-icon />
      </div>
    </button>
    <button
      v-if="mode === 'weekly'"
      class="h-10 w-10 grid place-items-center ring-pink-500 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:outline-none rounded-full transition"
      :class="{ 'pointer-events-none': busy }"
      :disabled="busy"
      @click="prevWeek"
    >
      <div class="h-2/3 w-2/3">
        <chevron-left-icon />
      </div>
    </button>
    <div class="text-center">
      <div v-if="mode === 'daily'">
        <p class="mb-2 text-2xl font-semibold">{{ formatTime(date.date) }}</p>
        <p class="text-gray-400">{{ formatTime(date.date, 'long') }}</p>
      </div>
      <div v-if="mode === 'weekly'">
        <p class="mb-2 text-2xl font-semibold">
          {{ formatTime(date.from, 'slash') }} -
          {{ formatTime(date.to, 'slash') }}
        </p>
        <p class="text-gray-400">
          {{ formatTime(date.from) }} - {{ formatTime(date.to) }}
        </p>
      </div>
    </div>
    <button
      v-if="mode === 'daily'"
      class="h-10 w-10 grid place-items-center ring-pink-500 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:outline-none rounded-full transition"
      :class="{ 'pointer-events-none': busy }"
      :disabled="busy"
      @click="nextDay"
    >
      <div class="h-2/3 w-2/3">
        <chevron-right-icon />
      </div>
    </button>
    <button
      v-if="mode === 'weekly'"
      class="h-10 w-10 grid place-items-center ring-pink-500 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:outline-none rounded-full transition"
      :class="{ 'pointer-events-none': busy }"
      :disabled="busy"
      @click="nextWeek"
    >
      <div class="h-2/3 w-2/3">
        <chevron-right-icon />
      </div>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import ChevronLeftIcon from '@/components/Icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@/components/Icons/ChevronRightIcon.vue';

export default {
  name: 'TimeFilter',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon
  },
  computed: {
    ...mapGetters({
      busy: 'todos/busy'
    }),
    mode() {
      const mode = this.$route.query.mode;
      return mode;
    },
    date() {
      const date = this.$route.query?.date;
      const from = this.$route.query?.from;
      const to = this.$route.query?.to;
      return { date, from, to };
    }
  },
  methods: {
    formatTime(tm, fm) {
      let time = moment(tm).format('dddd');
      if (fm === 'long') {
        time = moment(tm).format('MMM Do YY');
      }

      if (fm === 'slash') {
        time = moment(tm).format('YYYY/MM/DD');
      }

      return time;
    },
    nextDay() {
      let date = this.date.date;
      date = moment(date).add(1, 'days').format('YYYY-MM-DD');

      return this.$router.push(`?mode=daily&date=${date}`);
    },
    nextWeek() {
      let from = this.date.from;
      let to = this.date.to;
      from = moment(from).add(6, 'days').format('YYYY-MM-DD');
      to = moment(to).add(6, 'days').format('YYYY-MM-DD');

      return this.$router.push(`?mode=weekly&from=${from}&to=${to}`);
    },
    prevDay() {
      let date = this.date.date;
      date = moment(date).subtract(1, 'days').format('YYYY-MM-DD');

      return this.$router.push(`?mode=daily&date=${date}`);
    },
    prevWeek() {
      let from = this.date.from;
      let to = this.date.to;
      from = moment(from).subtract(6, 'days').format('YYYY-MM-DD');
      to = moment(to).subtract(6, 'days').format('YYYY-MM-DD');

      return this.$router.push(`?mode=weekly&from=${from}&to=${to}`);
    }
  }
};
</script>
