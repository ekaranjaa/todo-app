<template>
  <div class="relative font-montserrat min-h-screen bg-pink-500">
    <div
      class="md:fixed min-h-screen md:min-h-0 top-0 left-0 md:top-1/2 md:left-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 max-w-lg w-full h-full md:h-auto bg-gray-800 text-gray-100 md:shadow-md md:rounded-lg overflow-hidden"
    >
      <Nuxt />
      <footr />
    </div>
  </div>
</template>

<script>
import Footr from '@/components/Navigation/Footer.vue';

export default {
  components: {
    Footr
  }
};
</script>