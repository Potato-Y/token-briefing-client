import { createStore } from 'vuex';

export default createStore({
  state: {
    alertMsg: { msg: 'MSG', modalState: false },
  },
  getters: {
    alertMsg: (state) => {
      return state.alertMsg;
    },
  },
  mutations: {
    setAlert: (state, msg) => {
      console.log('setAlert msg: ' + msg);
      state.alertMsg.msg = msg;
      state.alertMsg.modalState = true;
    },
    setAlertOff: (state) => {
      state.alertMsg.modalState = false;
    },
  },
  actions: {},
  modules: {},
});
