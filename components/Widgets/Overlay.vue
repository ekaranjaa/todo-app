<template>
  <div
    class="overlay fixed top-0 left-0 backdrop-filter backdrop-blur h-screen w-screen bg-black transition-all duration-300 z-20"
    :class="{
      'opacity-0 invisible': !active,
      'opacity-50 visible': active
    }"
  ></div>
</template>

<script>
export default {
  name: 'Overlay',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>