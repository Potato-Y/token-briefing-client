import { createStore } from 'vuex';
import log from 'electron-log';

export default createStore({
  state: {
    alertMsg: { msg: 'MSG', modalState: false },
    /** 서버에서 받은 token briefing 데이터 */
    apiDataTokenBriefing: {},
    /** 서버에서 받은 memo 데이터 */
    apiMemoData: null,
  },
  getters: {
    /**
     * 커스텀 alert
     * @param state
     * @returns 커스텀 alert 의 메시지를 반환
     */
    alertMsg: (state) => {
      return state.alertMsg;
    },
    /**
     * @param state
     * @returns 저장된 토큰 브리핑의 데이터를 반환
     */
    getApiDataTokenBriefing: (state) => {
      return state.apiDataTokenBriefing;
    },
    /**
     *
     * @param state
     * @returns 저장된 메모 데이터를 반환
     */
    getApiMemoData: (state) => {
      return state.apiMemoData;
    },
  },
  mutations: {
    /**
     * 커스텀 alert를 표시하도록 메시지를 설정
     * @param  state
     * @param  msg 메시지 내용
     */
    setAlert: (state, msg) => {
      log.info('setAlert msg: ' + msg);
      state.alertMsg.msg = msg;
      state.alertMsg.modalState = true;
    },
    /**
     * 커스텀 alert를 닫기
     * @param  state
     */
    setAlertOff: (state) => {
      state.alertMsg.modalState = false;
    },
    setApiDataTokenBriefing: (state, data) => {
      log.info('setApiDataTokenBriefing data: ' + data);
      state.apiDataTokenBriefing = data;
    },
    setApiMemoData: (state, data) => {
      log.info('setApiMemoData data: ' + data);
      state.apiMemoData = data;
    },
  },
  actions: {},
  modules: {},
});
