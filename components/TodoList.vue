<template>
  <div class="todo-container md:h-72 md:overflow-y-auto">
    <div v-if="busy">
      <spinner class="mx-auto" />
    </div>
    <div v-else>
      <div v-if="todos.length > 0">
        <div v-if="pinnedTodos.length > 0">
          <todo-tile
            v-for="(todo, index) in pinnedTodos"
            :key="index"
            :todo="todo"
          />
          <hr class="my-4 border-gray-900" />
        </div>
        <todo-tile
          v-for="(todo, index) in unpinnedTodos"
          :key="index"
          :todo="todo"
        />
      </div>
      <div v-else>
        <p class="font-semibold text-center">You have no tasks yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TodoTile from './TodoTile.vue';
import Spinner from './Widgets/Spinner.vue';

export default {
  name: 'TodoList',
  components: { Spinner, TodoTile },
  data() {
    return {
      pinnedTodos: null,
      unpinnedTodos: null
    };
  },
  computed: {
    ...mapGetters({
      busy: 'todos/busy',
      todos: 'todos/todos'
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
  watch: {
    mode() {
      this.getTodos(true);
    },
    date() {
      this.getTodos(true);
    },
    todos() {
      this.filterTodos();
    }
  },
  created() {
    this.getTodos(true);
  },
  methods: {
    ...mapActions({
      getTodos: 'todos/get'
    }),
    filterTodos() {
      this.pinnedTodos = this.todos.filter(todo => todo.pinned);
      this.unpinnedTodos = this.todos.filter(todo => !todo.pinned);
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1024px) {
  .todo-container {
    &::-webkit-scrollbar {
      width: 0.5rem;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 25px;
      background: #52525b;

      &:hover {
        background: #71717a;
      }
    }
  }
}
</style>
