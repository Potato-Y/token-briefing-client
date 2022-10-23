<template>
  <div v-if="appReady == true">
    <AppReady />
    <button
      class="setting-item"
      @click="appReady = false"
      v-if="serverConnectTryCnt > 3"
    >
      연결 설정 변경
    </button>
  </div>

  <div v-if="appReady == false">
    <SettingComp :changeMainPageLock="changeMainPageLock" />
  </div>
</template>

<script>
import AppReady from "@/components/AppReady.vue";
import log from "electron-log";
import SettingComp from "@/components/SettingComp.vue";

export default {
  name: "ReadyView",
  props: {
    /** 메인 페이지 락 변경 메소드 */
    changeMainPageLock: Function,
  },
  components: { AppReady, SettingComp },
  data() {
    return {
      /** 프로그램 로딩 중일 경우 표시됩니다. */
      appReady: true,
      /** 서버 연결 실패 횟수 */
      serverConnectTryCnt: 0,
    };
  },
  methods: {
    /** 메인 페이지의 락을 해제 */
    runMainPageUnlock() {
      this.changeMainPageLock(false);
    },
    /** 클라이언트 세팅값을 렌더로 가지고 오기 */
    getClientSetting() {
      const { ipcRenderer } = require("electron");
      log.info("getClientSetting()");
      let data = ipcRenderer.sendSync("get-client-setting", null);

      if (data.userName == "\\Not Loading\\") {
        // 만약 아직 로딩 전이면 2초 뒤 재시도
        return setTimeout(() => {
          log.info(data);
          this.getClientSetting();
        }, 2000);
      } else if (data.userName != "not found" || data.serverIp != "not found") {
        // 만약 기본 설정이 완료된 경우 변수에 데이터를 저장하고 서버 연결 시도

        const check = () => {
          log.info("서버 연결을 시도합니다.");
          if (this.appReady == false) {
            //만약 앱 준비 상태가 아닌 기본 설정으로 이동할 경우 종료
            return;
          } else {
            if (
              ipcRenderer.sendSync("api-server-check", data.serverIp) == true
            ) {
              // 서버가 온라인인 경우 메인 페이지 언락
              this.runMainPageUnlock();
            } else {
              // 서버에 연결을 실패한 경우 재시도
              this.serverConnectTryCnt++;
              setTimeout(() => {
                check();
              }, 2000);
            }
          }
        };

        check();
      } else {
        // 로딩이 완료된 경우 기본 설정 페이지로 화면을 변경
        log.info("설정값을 불러왔습니다.");
        this.appReady = false;
      }
    },
  },
  mounted() {
    this.getClientSetting();
  },
};
</script>

<style>
@import url("./ReadyView.css");
</style>