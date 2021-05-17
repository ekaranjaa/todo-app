<template>
  <form autocomplete="off" class="py-4" @submit.prevent="submitForm">
    <div
      class="flex items-center border-2 border-gray-900 bg-gray-700 ring-pink-500 focus-within:ring-2 rounded-md transition overflow-hidden"
    >
      <div class="h-12 w-12 grid place-items-center text-gray-500">
        <div class="h-2/3 w-2/3">
          <list-icon />
        </div>
      </div>
      <input
        id="newTodo"
        v-model="data.title"
        type="text"
        class="px-2 h-12 block w-full bg-transparent focus:outline-none"
        placeholder="Add a task..."
        :disabled="busy"
        required
      />
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListIcon from './Icons/ListIcon.vue';

export default {
  name: 'TaskInput',
  components: { ListIcon },
  data() {
    return {
      data: {
        title: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'authentication/busy'
    })
  },
  methods: {
    ...mapActions({
      addTask: 'todos/create'
    }),
    submitForm() {
      this.addTask(this.data).then(() => {
        this.data.title = null;
      });
    }
  }
};
</script>
