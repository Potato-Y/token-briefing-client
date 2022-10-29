<template>
  <div>
    <div class="setting-item">기본 설정</div>
    <div class="setting-item">
      서버 IP
      <input type="text" v-model="serverIp" @input="startButtonLockOn()" />
      <button @click="serverCheck">서버 확인</button><br />
      서버 확인: {{ serverStateText }}
    </div>
    <div class="setting-item">사용자 이름 <input v-model="userName" /></div>
    <div class="setting-item">
      부팅 시 자동 시작 <input type="checkbox" v-model="checkboxOpenAtLogin" />
    </div>
    <button
      class="setting-item"
      @click="start"
      v-bind:disabled="startButtonLock == true || userName == ''"
    >
      저장
    </button>

    <div>
      <router-link to="/opensource">오픈 소스</router-link>
    </div>
  </div>
</template>

<script>
import log from "electron-log";

export default {
  name: "SettingComp",
  props: {
    /** 메인 페이지 락 변경 메소드 */
    changeMainPageLock: Function,
  },
  data() {
    return {
      /** 서버 ip */
      serverIp: "",
      /** 서버 상태 확인 문구 */
      serverStateText: "확인 전",
      /** 유저 이름 */
      userName: "",
      /** 저장 및 시작 버튼 활성화 */
      startButtonLock: true,
      /** 부팅 시  자동으로 실행 */
      checkboxOpenAtLogin: true,
    };
  },
  methods: {
    /** 클라이언트 세팅값을 렌더로 가지고 오기 */
    getClientSetting() {
      const { ipcRenderer } = require("electron");
      log.info("getClientSetting()");
      let data = ipcRenderer.sendSync("get-client-setting", null);
      if (data.userName != "not found" || data.serverIp != "not found") {
        // 만약 기본 설정이 완료된 경우 변수에 데이터를 저장하고 서버 연결 시도
        this.serverIp = data.serverIp;
        this.userName = data.userName;
        this.checkboxOpenAtLogin = data.openAtLogin;
      }
    },
    /** 서버 주소 응답 확인 */
    serverCheck() {
      // ipc를 통해 electron main에 axios 요청
      const { ipcRenderer } = require("electron");
      log.info("서버 주소를 확인합니다.");
      if (ipcRenderer.sendSync("api-server-check", this.serverIp) == true) {
        this.serverStateText = "연결 가능";
        this.startButtonLock = false;
      } else {
        this.serverStateText = "연결 불가";
        this.startButtonLock = true;
      }
    },
    /** 시작 버튼 락 */
    startButtonLockOn() {
      this.startButtonLock = true;
    },
    /** 저장 및 시작 버튼을 누른 경우 */
    start() {
      const { ipcRenderer } = require("electron");
      if (
        ipcRenderer.sendSync("set-client-settings", {
          serverIp: this.serverIp,
          userName: this.userName,
          checkboxOpenAtLogin: this.checkboxOpenAtLogin,
        }) == true
      ) {
        log.info("db 업데이트 완료");

        this.changeMainPageLock(false);
        this.$router.push("/");
      } else {
        this.$store.commit("setAlert", "저장에 실패하였습니다.");
        log.info("db 업데이트 실패");
      }
    },
  },
  mounted() {
    this.getClientSetting();
  },
};
</script>