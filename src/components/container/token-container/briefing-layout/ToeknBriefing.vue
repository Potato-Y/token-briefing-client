<template>
  <div>
    <!-- 업로드 된 브리핑이 없을 경우 -->
    <div v-if="showBriefing == false" className="token-panel-wrap">
      <div className="token-panel-content-wrap font-background-transparency">
        아직 업로드 된 마감 번호가 없습니다.
      </div>
    </div>
  </div>
  <div>
    <!-- 업로드 된 브라핑이 있을 경우 -->
    <div v-if="showBriefing == true" className="token-panel-wrap">
      <div
        className="token-panel-content-wrap font-background-transparency"
        style="line-height: 130%"
      >
        당일 오전 마감번호가 있습니다. <br />
        시간: {{ updateDate.split(" ")[0] }}
        {{ updateDate.split(" ")[1] }}
        <br />
        작성자: {{ writter }}<br /><br />
        1000: {{ token1000 }}<br />
        2000: {{ token2000 }}<br />
        3000: {{ token3000 }}<br />
        4000: {{ token4000 }}<br />
        5000: {{ token5000 }}<br /><br />
        [메모]<br />
        {{ memo }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TokenBriefing",
  data() {
    return {
      /** 브리핑 표시 상태 */
      showBriefing: false,
      /** 업데이트 날짜 */
      updateDate: "",
      /** 작성자 */
      writter: "",
      /** 메모 */
      memo: "",
      token1000: "-",
      token2000: "-",
      token3000: "-",
      token4000: "-",
      token5000: "-",
    };
  },
  methods: {
    /** api 서버에서 정보를 가져오기 */
    getData() {
      console.log("최신 브리핑 데이터를 로드합니다.");
      const { ipcRenderer } = require("electron");
      let req = ipcRenderer.sendSync(
        "api-tokenbriefing-last_latest_post",
        null
      );

      if (req.tokenbriefingDbData != undefined) {
        // 가져온 값이 없으면 패스
        this.dataSet(req.tokenbriefingDbData);
      }
    },
    /**
     * api서버에서 받아온 데이터를 변수에 저장하고 필요시 화면을 바꾼다.
     * @param {Json} req ipcMain에서 보내온 data.tokenbriefingDbData를 넣어주세요.
     */
    dataSet(data) {
      const localDate = new Date(); // locale 시간

      var nowTimeYear = localDate.getFullYear();
      var nowTimeMonth = ("00" + (localDate.getMonth() + 1)).slice(-2);
      var nowTimeDate = ("00" + localDate.getDate()).slice(-2);

      // 현재 시간 (처리 시간)
      const date = `${nowTimeYear}-${nowTimeMonth}-${nowTimeDate}`;

      if (date == data.date.split(" ")[0]) {
        // 오늘 것이 맞으면 실행

        if (this.updateDate != data.date) {
          // 만약 새로운 내용이 있다면 실행
          this.token1000 = data.token1000;
          this.token2000 = data.token2000;
          this.token3000 = data.token3000;
          this.token4000 = data.token4000;
          this.token5000 = data.token5000;
          this.writter = data.writter;
          this.updateDate = data.date;
          this.memo = data.memo;

          this.showBriefing = true;
        }
      } else {
        this.showBriefing = false;
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
@import url("./ToeknBriefing.css");
</style>