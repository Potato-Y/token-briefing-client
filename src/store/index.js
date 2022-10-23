import { createStore } from 'vuex';
import log from 'electron-log';

export default createStore({
  state: {
    alertMsg: { msg: 'MSG', modalState: false },
    /** 서버에서 받은 token briefing 데이터 */
    tokenBriefingApiData: null,
    /** 서버에서 받은 memo 데이터 */
    memoApiData: null,
  },
  getters: {
    alertMsg: (state) => {
      return state.alertMsg;
    },
    getTokenBriefingApiData: (state) => {
      return state.tokenBriefingApiData;
    },
    getMemoApiData: (state) => {
      return state.memoApiData;
    },
  },
  mutations: {
    setAlert: (state, msg) => {
      log.info('setAlert msg: ' + msg);
      state.alertMsg.msg = msg;
      state.alertMsg.modalState = true;
    },
    setAlertOff: (state) => {
      state.alertMsg.modalState = false;
    },
    setTokenBriefingApiData: (state, data) => {
      log.info('setTokenBriefingApiData data: ' + data);
      state.tokenBriefingApiData = data;
    },
    setMemoApiData: (state, data) => {
      log.info('setMemoApiData data: ' + data);
      state.memoApiData = data;
    },
  },
  actions: {},
  modules: {},
});
