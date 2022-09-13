<template>
  <div>기본 설정</div>
  <br />
  <div>
    서버 IP
    <input type="text" v-model="serverIp" @input="startButtonLockOn()" />
    <button @click="serverCheck">서버 확인</button><br />
    서버 확인: {{ serverCheckState }}
  </div>
  <div>사용자 이름 <input v-model="userName" /></div>
  <button
    @click="start"
    v-bind:disabled="startButtonLock == true || userName == ''"
  >
    저장 및 시작
  </button>
</template>

<script>
export default {
  name: "ReadyView",
  props: {
    /** 메인 페이지 락 변경 메소드 */
    changeMainPageLock: Function,
  },
  data() {
    return {
      /** 서버 ip */
      serverIp: "",
      /** 서버 상태 확인 문구 */
      serverCheckState: "확인 전",
      /** 유저 이름 */
      userName: "",
      /** 저장 및 시작 버튼 활성화 */
      startButtonLock: true,
    };
  },
  methods: {
    runMainPageUnlock() {
      this.changeMainPageLock(true);
    },

    /** 서버 주소 응답 확인 */
    serverCheck() {
      // ipc를 통해 electron main에 axios 요청
      const { ipcRenderer } = require("electron");
      console.log("서버 주소를 확인합니다.");
      if (ipcRenderer.sendSync("api-server-check", this.serverIp) == true) {
        this.serverCheckState = "연결 가능";
        this.startButtonLock = false;
      } else {
        this.serverCheckState = "연결 불가";
        this.startButtonLock = true;
      }
    },

    startButtonLockOn() {
      this.startButtonLock = true;
    },

    /** 저장 및 시작 버튼을 누른 경우 */
    start() {
      this.changeMainPageLock(false);
    },
  },
};
</script>

<style>
@import url("./ReadyView.css");
</style>