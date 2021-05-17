<template>
  <div class="mx-auto py-4 w-full flex items-center justify-between">
    <button
      v-if="mode === 'daily'"
      class="h-10 w-10 grid place-items-center ring-pink-500 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:outline-none rounded-full transition"
      :class="{
        'pointer-events-none': busy || prevDayClimax,
        'text-gray-500': prevDayClimax
      }"
      :disabled="busy || prevDayClimax"
      @click="prevDay"
    >
      <div class="h-2/3 w-2/3">
        <chevron-left-icon />
      </div>
    </button>
    <button
      v-if="mode === 'weekly'"
      class="h-10 w-10 grid place-items-center ring-pink-500 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:outline-none rounded-full transition"
      :class="{
        'pointer-events-none': busy || prevWeekClimax,
        'text-gray-500': prevWeekClimax
      }"
      :disabled="busy || prevWeekClimax"
      @click="prevWeek"
    >
      <div class="h-2/3 w-2/3">
        <chevron-left-icon />
      </div>
    </button>
    <div class="text-center">
      <div v-if="mode === 'daily'">
        <p class="mb-2 text-2xl font-semibold">{{ formatTime(dates.date) }}</p>
        <p class="text-gray-400">{{ formatTime(dates.date, 'text') }}</p>
      </div>
      <div v-if="mode === 'weekly'">
        <p class="mb-2 text-2xl font-semibold">
          {{ formatTime(dates.from, 'slash') }} -
          {{ formatTime(dates.to, 'slash') }}
        </p>
        <p class="text-gray-400">
          {{ formatTime(dates.from) }} - {{ formatTime(dates.to) }}
        </p>
      </div>
    </div>
    <button
      v-if="mode === 'daily'"
      class="h-10 w-10 grid place-items-center ring-pink-500 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:outline-none rounded-full transition"
      :class="{
        'pointer-events-none': busy || nextDayClimax,
        'text-gray-500': nextDayClimax
      }"
      :disabled="busy || nextDayClimax"
      @click="nextDay"
    >
      <div class="h-2/3 w-2/3">
        <chevron-right-icon />
      </div>
    </button>
    <button
      v-if="mode === 'weekly'"
      class="h-10 w-10 grid place-items-center ring-pink-500 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:outline-none rounded-full transition"
      :class="{
        'pointer-events-none': busy || nextWeekClimax,
        'text-gray-500': nextWeekClimax
      }"
      :disabled="busy || nextWeekClimax"
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
  data() {
    return {
      nextDayClimax: false,
      nextWeekClimax: false,
      prevDayClimax: false,
      prevWeekClimax: false
    };
  },
  computed: {
    ...mapGetters({
      busy: 'todos/busy'
    }),
    mode() {
      const mode = this.$route.query.mode;
      return mode;
    },
    dates() {
      const date = this.$route.query?.date;
      const from = this.$route.query?.from;
      const to = this.$route.query?.to;
      return { date, from, to };
    }
  },
  methods: {
    formatTime(tm, fm) {
      let time = moment(tm).format('dddd');
      if (fm === 'text') {
        time = moment(tm).format('MMM Do YY');
      }

      if (fm === 'slash') {
        time = moment(tm).format('YYYY/MM/DD');
      }

      return time;
    },
    nextDay() {
      this.prevDayClimax = false;
      const today = moment().format('YYYY-MM-DD');
      const currentDate = this.dates.date;
      const nextDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD');

      if (nextDate > today) {
        this.nextDayClimax = true;
        return;
      }

      return this.$router.push(`?mode=daily&date=${nextDate}`);
    },
    nextWeek() {
      this.prevWeekClimax = false;
      const thisWeek = moment().add(6, 'days').format('YYYY-MM-DD');
      const currentFrom = this.dates.from;
      const currentTo = this.dates.to;
      const nextFrom = moment(currentFrom).add(6, 'days').format('YYYY-MM-DD');
      const nextTo = moment(currentTo).add(6, 'days').format('YYYY-MM-DD');

      if (nextTo > thisWeek) {
        this.nextWeekClimax = true;
        return;
      }

      return this.$router.push(`?mode=weekly&from=${nextFrom}&to=${nextTo}`);
    },
    prevDay() {
      this.nextDayClimax = false;
      const registrationDate = this.$auth.user.time_stamps.created_at;
      const currentDate = this.dates.date;
      const prevDate = moment(currentDate)
        .subtract(1, 'days')
        .format('YYYY-MM-DD');

      if (prevDate < registrationDate) {
        this.prevDayClimax = true;
        return;
      }

      return this.$router.push(`?mode=daily&date=${prevDate}`);
    },
    prevWeek() {
      this.nextWeekClimax = false;
      const registrationWeek = this.$auth.user.time_stamps.created_at;
      const currentFrom = this.dates.from;
      const currentTo = this.dates.to;
      const prevFrom = moment(currentFrom)
        .subtract(6, 'days')
        .format('YYYY-MM-DD');
      const prevTo = moment(currentTo).subtract(6, 'days').format('YYYY-MM-DD');

      if (prevFrom < registrationWeek) {
        this.prevWeekClimax = true;
        return;
      }

      return this.$router.push(`?mode=weekly&from=${prevFrom}&to=${prevTo}`);
    }
  }
};
</script>
