<template>
  <div class="py-4 px-8">
    <time-filter />
    <todo-input />
    <todo-modal />
    <todo-list />
  </div>
</template>

<script>
import TimeFilter from '@/components/TimeFilter.vue';
import TodoInput from '@/components/TodoInput.vue';
import TodoModal from '@/components/TodoModal.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  name: 'Home',
  components: {
    TimeFilter,
    TodoInput,
    TodoModal,
    TodoList
  },
  middleware: ['isVerified']
};
</script>
