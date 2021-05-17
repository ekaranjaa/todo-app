<template>
  <div>
    <spinner />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Spinner from '@/components/Widgets/Spinner.vue';

export default {
  auth: 'guest',
  components: { Spinner },
  layout: 'blank',
  created() {
    this.setToken(this.$route.query.token);
  },
  methods: {
    ...mapActions({
      setToken: 'authentication/setToken'
    })
  }
};
</script>