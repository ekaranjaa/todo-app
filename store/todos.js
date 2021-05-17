/* eslint-disable no-console */

export const state = () => ({
  todos: null,
  busy: null
});

export const getters = {
  todos: state => state.todos,
  busy: state => state.busy
};

export const mutations = {
  SET_TODOS(state, payload) {
    state.todos = payload;
  },

  IS_BUSY(state, payload) {
    state.busy = payload;
  }
};

export const actions = {
  async get({ getters, commit }, refresh) {
    commit('IS_BUSY', true);

    let todos = getters.todos;

    if (!todos || todos.length > 0 || refresh) {
      todos = await this.$axios.get('/todos');
      todos = todos.data.data;
    }

    commit('SET_TODOS', todos);
    commit('IS_BUSY', false);
  },

  async getDaily({ getters, commit }, { date, refresh }) {
    commit('IS_BUSY', true);

    let todos = getters.todos;

    if (!todos || todos.length > 0 || refresh) {
      todos = await this.$axios.get(`/todos/daily/${date}`);
      todos = todos.data.data;
    }

    commit('SET_TODOS', todos);
    commit('IS_BUSY', false);
  },

  async getWeekly({ getters, commit }, { from, to, refresh }) {
    commit('IS_BUSY', true);

    let todos = getters.todos;

    if (!todos || todos.length > 0 || refresh) {
      todos = await this.$axios.get(`/todos/weekly/${from}/${to}`);
      todos = todos.data.data;
    }

    commit('SET_TODOS', todos);
    commit('IS_BUSY', false);
  },

  async create({ commit, dispatch }, data) {
    commit('IS_BUSY', true);

    await this.$axios
      .post('/todos', data)
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  },

  async pin({ commit, dispatch }, { id, status }) {
    commit('IS_BUSY', true);

    await this.$axios
      .put(`/todos/pinned-status/${id}`, status)
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  },

  async complete({ commit, dispatch }, { id, status }) {
    commit('IS_BUSY', true);

    await this.$axios
      .put(`/todos/completed-status/${id}`, status)
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  },

  async update({ commit, dispatch }, { id, data }) {
    commit('IS_BUSY', true);

    await this.$axios
      .put(`/todos/${id}`, data)
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  },

  async delete({ commit, dispatch }, id) {
    if (!confirm('Are you sure?')) return;

    commit('IS_BUSY', true);

    await this.$axios
      .delete(`/todos/${id}`)
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  }
};
