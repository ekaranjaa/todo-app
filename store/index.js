export const state = () => ({
  modal: {
    open: false,
    todo: null,
    action: null
  }
});

export const getters = {
  modal: state => state.modal
};

export const mutations = {
  SET_MODAL(state, payload) {
    state.modal = payload;
  }
};

export const actions = {
  openModal({ commit }, { todo, action }) {
    commit('SET_MODAL', {
      open: true,
      todo,
      action
    });
  },

  closeModal({ commit }) {
    commit('SET_MODAL', {
      open: false,
      todo: null,
      action: false
    });
  }
};
