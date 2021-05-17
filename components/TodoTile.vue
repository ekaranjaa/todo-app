<template>
  <div class="py-2 px-6">
    <div class="flex relative">
      <div
        v-if="options.pinned"
        class="h-4 w-4 text-pink-500 absolute top-0 right-full transform -rotate-45 -translate-x-2"
      >
        <pin-icon />
      </div>
      <div class="mr-4 h-5 w-5 flex-shrink-0">
        <checkbox-icon v-if="options.completed" />
        <blank-checkbox-icon v-else />
      </div>
      <label :for="`todo-${todo.id}`" class="-mt-1 block select-none">
        <input
          :id="`todo-${todo.id}`"
          v-model="options.completed"
          type="checkbox"
          hidden
          :disabled="busy"
          :class="{ 'pointer-events-none': busy }"
          @change="complete(todo.id, options.completed)"
        />
        <p class="font-semibold" :class="{ 'line-through': options.completed }">
          {{ todo.title }}
        </p>
        <p class="text-sm text-gray-500">
          {{ todo.memo ? trimMemo(todo.memo) : null }}
        </p>
      </label>
      <div class="ml-auto relative">
        <button
          class="h-7 w-7 flex-shrink-0 grid place-items-center rounded-full ring-pink-500 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:outline-none transition"
          @click.stop="menu = !menu"
        >
          <div class="h-2/3 w-2/3">
            <ellipsis-icon />
          </div>
        </button>
        <menu
          class="m-0 p-0 absolute top-7 right-0 transform origin-top-right bg-gray-700 rounded-md shadow-md transition-all overflow-hidden z-10"
          :class="{
            'invisible opacity-0 scale-50': !menu,
            'visible opacity-100 scale-100': menu
          }"
        >
          <button
            v-if="!options.pinned"
            class="py-2 px-4 w-full flex items-center hover:bg-gray-600 focus:bg-gray-600 focus:outline-none transition"
            @click="pin(todo.id, true)"
          >
            <div class="mr-2 h-4 w-4">
              <pin-icon />
            </div>
            <p class="text-sm whitespace-nowrap">Pin to top</p>
          </button>
          <button
            v-else
            class="py-2 px-4 w-full flex items-center hover:bg-gray-600 focus:bg-gray-600 focus:outline-none transition"
            @click="pin(todo.id, false)"
          >
            <div class="mr-2 h-4 w-4">
              <pin-icon />
            </div>
            <p class="text-sm whitespace-nowrap">Unpin from top</p>
          </button>
          <button
            v-if="!todo.memo"
            class="py-2 px-4 w-full flex items-center hover:bg-gray-600 focus:bg-gray-600 focus:outline-none transition"
            @click="openModal({ todo: todo, action: 'add' })"
          >
            <div class="mr-2 h-4 w-4">
              <add-icon />
            </div>
            <p class="text-sm whitespace-nowrap">Add memo</p>
          </button>
          <button
            v-else
            class="py-2 px-4 w-full flex items-center hover:bg-gray-600 focus:bg-gray-600 focus:outline-none transition"
            @click="openModal({ todo: todo, action: 'add' })"
          >
            <div class="mr-2 h-4 w-4">
              <edit-icon />
            </div>
            <p class="text-sm whitespace-nowrap">Edit memo</p>
          </button>
          <button
            class="py-2 px-4 w-full flex items-center hover:bg-gray-600 focus:bg-gray-600 focus:outline-none transition"
            @click="deleteTodo(todo.id)"
          >
            <div class="mr-2 h-4 w-4">
              <delete-icon />
            </div>
            <p class="text-sm whitespace-nowrap">Delete</p>
          </button>
        </menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CheckboxIcon from './Icons/CheckboxIcon.vue';
import BlankCheckboxIcon from './Icons/BlankCheckboxIcon.vue';
import EllipsisIcon from './Icons/EllipsisIcon.vue';
import PinIcon from './Icons/PinIcon.vue';
import EditIcon from './Icons/EditIcon.vue';
import DeleteIcon from './Icons/DeleteIcon.vue';
import AddIcon from './Icons/AddIcon.vue';

export default {
  name: 'TaskTile',
  components: {
    CheckboxIcon,
    BlankCheckboxIcon,
    EllipsisIcon,
    PinIcon,
    EditIcon,
    DeleteIcon,
    AddIcon
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menu: false,
      options: {
        pinned: false,
        completed: false
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'todos/busy'
    })
  },
  watch: {
    todo: {
      immediate: true,
      handler() {
        this.setOptions();
      }
    },
    menu: {
      immediate: true,
      handler() {
        this.handleMenuToggle();
      }
    }
  },
  methods: {
    ...mapActions({
      pinTodo: 'todos/pin',
      completeTodo: 'todos/complete',
      updateTodo: 'todos/update',
      deleteTodo: 'todos/delete',
      openModal: 'openModal'
    }),
    pin(todoId, status) {
      this.pinTodo({
        id: todoId,
        status: { pinned: status }
      });
    },
    complete(todoId, status) {
      this.completeTodo({
        id: todoId,
        status: { completed: status }
      });
    },
    setOptions() {
      this.options.pinned = this.todo.pinned;
      this.options.completed = this.todo.completed;
    },
    handleMenuToggle() {
      window.onclick = () => {
        if (!this.menu) return;
        this.menu = false;
      };
    },
    trimMemo(memo) {
      const maxLength = 40;
      let trimmedDesc;

      if (memo.length > maxLength) {
        trimmedDesc = `${memo.substring(0, maxLength)}...`;
      } else {
        trimmedDesc = memo;
      }

      return trimmedDesc;
    }
  }
};
</script>
