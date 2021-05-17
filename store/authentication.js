/* eslint-disable no-console */

export const state = () => ({
  busy: false,
  errors: null
});

export const getters = {
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  IS_BUSY(state, payload) {
    state.busy = payload;
  },

  SET_ERRORS(state, payload) {
    state.errors = payload;
  }
};

export const actions = {
  clearErrors({ commit }) {
    return commit('SET_ERRORS', null);
  },

  setToken(context, token) {
    this.$auth.setUserToken(token);
    this.$router.push({ path: '/' });
  },

  async login({ commit }, user) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$auth
      .loginWith('local', { data: user })
      .then(() => {
        commit('IS_BUSY', false);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.log(err);
      });
  },

  async register({ commit, dispatch }, user) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/auth/register', user)
      .then(() => {
        dispatch('login', user);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.log(err);
      });
  },

  async update({ commit }, user) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .put('/auth', user)
      .then(async () => {
        commit('IS_BUSY', false);
        await this.$auth.fetchUser();
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.log(err);
      });
  },

  async updatePassword({ commit }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .put('/auth/update-password', data)
      .then(async () => {
        commit('IS_BUSY', false);
        await this.$auth.fetchUser();
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.log(err);
      });
  },

  async logout({ commit }) {
    commit('IS_BUSY', true);

    await this.$auth
      .logout()
      .then(() => {
        commit('IS_BUSY', false);
      })
      .catch(err => {
        commit('IS_BUSY', false);
        console.log(err);
      });
  },

  async forgotPassword({ commit }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/auth/forgot-password', data)
      .then(() => {
        commit('IS_BUSY', false);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.log(err);
      });
  },

  async resetPassword({ commit }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/auth/reset-password', data)
      .then(() => {
        commit('IS_BUSY', false);
        this.$router.push({ path: '/login' });
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.log(err);
      });
  },

  async delete({ commit, dispatch }) {
    if (!confirm('Are you sure?')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete('/auth/delete')
      .then(() => {
        commit('IS_BUSY', false);
        dispatch('logout');
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.log(err);
      });
  }
};
