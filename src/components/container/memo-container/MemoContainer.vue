<template>
  <div id="memo-container-body">
    <div class="memo-container-title">
      <span id="memo-container-title-text">메모</span> |
      <button id="new-memo-button" @click="memoModeChange">
        {{ newMemoButtonText }}
      </button>
    </div>

    <!-- 메모를 작성하고자 하는 경우 표시 -->
    <div v-show="mode == 'write'" class="memo-write">
      <MemoWritePanel :memoModeChange="memoModeChange" />
    </div>

    <!-- 메모를 읽고자 하는 경우 표시 -->
    <div v-show="mode == 'read'" v-for="(item, i) in data" :key="i">
      <MemoItem
        :memoKey="item.key"
        :key="i"
        :writer="item.writer"
        :date="item.date"
        :content="item.content"
        :memoReload="memoReload"
      />
    </div>
  </div>
</template>

<script>
import log from "electron-log";
import MemoItem from "./MemoItem.vue";
import MemoWritePanel from "./MemoWritePanel.vue";
import { onUnmounted } from "@vue/runtime-core";

export default {
  name: "MemoContainer",
  data() {
    return {
      /** 메모 관련 데이터 */
      data: [],
      /** 마지막 업데이트 시각 */
      update: "",
      /** 첫 로드 시 알림을 보내지 않게 하기 위한 락 */
      firstNoti: true,
      /** 메모를 읽는지 쓰는지에 따른 모드 */
      mode: "read",
      newMemoButtonText: "새 메모",
      memoModeChange: () => {
        if (this.mode == "read") {
          this.mode = "write";
          this.newMemoButtonText = "닫기";
        } else {
          this.mode = "read";
          this.newMemoButtonText = "새 메모";

          this.memoReload();
        }
      },
      memoReload: () => {
        log.info("메모 데이터를 다시 로드합니다.");
        const { ipcRenderer } = require("electron");
        let req = ipcRenderer.sendSync("api-memo-today-all");

        if (req.memoDbData != undefined) {
          // 가져온 값이 없다면 5초 후 재호출로 바로 넘어간다.

          // 새로운 업데이트 내용을 확인한 후 데이터를 저장한다.
          if (req.lastUpdate != this.update) {
            // 최신 정보 저장
            this.update = req.lastUpdate;
            this.data = req.memoDbData.reverse();
          }
        } else {
          this.data = [];
        }
      },
    };
  },
  methods: {
    setData() {
      //기존에 저장된 내용이 있다면 불러오기
      if (this.$store.state.apiMemoData !== null) {
        const tempData = this.$store.state.apiMemoData;

        this.update = tempData.lastUpdate;
        this.data = tempData.memoDbData.reverse();
      }

      const { ipcRenderer } = require("electron");

      /**
       * 5초마다 새로운 정보를 로드하도록 수정
       */
      const set = () => {
        console.log("최신 메모 데이터를 로드합니다.");

        // ipcMain으로 api 데이터 요청
        const req = ipcRenderer.sendSync("api-memo-today-all");

        if (req.memoDbData != undefined) {
          // 가져온 값이 없다면 5초 후 재호출로 바로 넘어간다.

          // 새로운 업데이트 내용을 확인한 후 데이터를 저장한다.
          if (req.lastUpdate != this.update) {
            // 최신 정보 저장
            this.update = req.lastUpdate;
            this.data = req.memoDbData.reverse();

            // 상태 관리에 받아온 데이터 저장하기
            this.$store.commit("setApiMemoData", req);

            if (this.firstNoti == false) {
              // 만약 첫 로드라면 이미 창이 열려있을 것을 감안하여 알림을 보내지 않는다.
              new Notification("메모 안내", {
                body: "메모에 변경 사항이 있습니다.",
              }).onclick = () => {
                ipcRenderer.send("win-show");
              };
            }
          }
        }

        // 첫 알림이 아님을 위해 false로 변경한다.
        this.firstNoti = false;
      };

      // 첫 실행 시작
      set();

      /** 5초마다 새로운 메모 정보 로드 */
      const loopSet = setInterval(() => {
        set();
      }, 5000);

      /** 라우터 이동 시 데이터 새로고침을 중지 */
      onUnmounted(() => {
        clearTimeout(loopSet);
      });
    },
  },
  mounted() {
    this.setData();
  },
  components: { MemoItem, MemoWritePanel },
};
</script>

<style>
@import url("./MemoContainer.css");
</style>