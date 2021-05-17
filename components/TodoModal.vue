<template>
  <div>
    <overlay :active="modal.open" />
    <form
      autocomplete="off"
      class="py-4 px-6 fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 max-w-xs w-full bg-gray-700 rounded-lg shadow-md transition-all z-20"
      :class="{
        'scale-50 invisible opacity-0': !modal.open,
        'scale-100 visible opacity-100': modal.open
      }"
      @submit.prevent="submitForm"
    >
      <label for="memo" class="mb-2 block">Add a memo</label>
      <div class="mb-4">
        <textarea
          id="memo"
          v-model="data.memo"
          rows="3"
          class="py-2 px-4 block w-full bg-gray-800 border-2 border-gray-900 outline-none ring-pink-500 focus:ring-2 transition rounded-md"
        ></textarea>
      </div>
      <div class="flex items-center">
        <button
          class="mr-2 py-2 px-4 bg-pink-500 ring-pink-500 rounded-md hover:bg-pink-600 focus:bg-pink-600 focus:ring-2 transition focus:outline-none"
          :class="{ 'pointer-events-none': busy }"
          :disabled="busy"
        >
          <spinner v-if="busy" class="mx-auto" />
          <span v-else> Add Memo </span>
        </button>
        <button
          type="button"
          class="py-2 px-4 bg-gray-600 ring-pink-500 rounded-md hover:bg-gray-500 focus:bg-gray-500 focus:ring-2 transition focus:outline-none"
          @click="closeModal"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Overlay from './Widgets/Overlay.vue';
import Spinner from './Widgets/Spinner.vue';

export default {
  name: 'TodoModal',
  components: {
    Overlay,
    Spinner
  },
  data() {
    return {
      data: {
        title: null,
        memo: null
      }
    };
  },
  computed: {
    ...mapGetters({
      modal: 'modal',
      busy: 'todos/busy'
    })
  },
  watch: {
    modal() {
      this.fillForm();
    }
  },
  methods: {
    ...mapActions({
      closeModal: 'closeModal',
      editMemo: 'todos/update'
    }),
    fillForm() {
      if (!this.modal.open) return;
      this.data.title = this.modal.todo.title;
      this.data.memo = this.modal.todo.memo;
    },
    submitForm() {
      this.editMemo({
        id: this.modal.todo.id,
        data: this.data
      }).then(() => {
        this.closeModal();
      });
    }
  }
};
</script>
