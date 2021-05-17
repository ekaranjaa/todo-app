/* eslint-disable no-console */

export const state = () => ({
  busy: false
});

export const getters = {
  busy: state => state.busy
};

export const mutations = {
  IS_BUSY(state, payload) {
    state.busy = payload;
  }
};

export const actions = {
  async resendVerification({ commit }) {
    commit('IS_BUSY', true);

    await this.$axios
      .post('/email/resend-verification-notification')
      .then(res => {
        console.log(res);
        commit('IS_BUSY', false);
      })
      .catch(err => {
        console.log(err);
      });
  },

  async verifyEmail({ commit }, verificationUrl) {
    commit('IS_BUSY', true);

    await this.$axios
      .post(verificationUrl)
      .then(async () => {
        await this.$auth.fetchUser();
        commit('IS_BUSY', false);
        this.$router.push({ path: '/login' });
      })
      .catch(err => {
        commit('IS_BUSY', false);
        console.log(err);
      });
  }
};
