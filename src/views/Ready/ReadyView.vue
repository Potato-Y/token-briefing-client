<template>
  <div>기본 설정</div>
  <br />
  <div>
    서버 IP
    <input type="text" v-model="serverIp" />
    <button @click="serverCheck">서버 확인</button><br />
    서버 확인: {{ serverCheckState }}
  </div>
  <div>사용자 이름 <input v-model="userName" /></div>
</template>

<script>
export default {
  name: "ReadyView",
  props: {
    /** 메인 페이지 락 변경 메소드 */
    changeMainPageLock: Object,
  },
  data() {
    return {
      /** 서버 ip */
      serverIp: "",
      serverCheckState: "확인 전",
      userName: "",
    };
  },
  methods: {
    runMainPageUnlock() {
      this.changeMainPageLock(false);
    },
    /** 서버 주소 응답 확인 */
    serverCheck() {
      // ipc를 통해 electron main에 axios 요청
      const { ipcRenderer } = require("electron");
      console.log("서버 주소를 확인합니다.");
      if (ipcRenderer.sendSync("api-server-check", this.serverIp) == true) {
        this.serverCheckState = "연결 가능";
      } else {
        this.serverCheckState = "연결 불가";
      }
    },
  },
};
</script>

<style>
@import url("./ReadyView.css");
</style>