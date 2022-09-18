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
        5000: {{ token5000 }}<br />
        <div v-if="memo != ''" class="font-background-transparency">
          <br />
          [메모]<br />
          <span
            class="font-background-transparency"
            style="white-space: pre-wrap"
          >
            {{ memo }}</span
          >
        </div>
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

      let nowTimeYear = localDate.getFullYear();
      let nowTimeMonth = ("00" + (localDate.getMonth() + 1)).slice(-2);
      let nowTimeDate = ("00" + localDate.getDate()).slice(-2);

      // 현재 시간 (처리 시간)
      const date = `${nowTimeYear}-${nowTimeMonth}-${nowTimeDate}`;

      if (date == data.date.split(" ")[0]) {
        // 오늘 것이 맞으면 실행

        // console.log(
        //   this.updateDate + "\n" + data.updateDate + "\n" + this.updateDate ==
        //     data.updateDate
        // );

        if (this.updateDate != data.date) {
          // 만약 새로운 내용이 있다면 실행

          /** Notification으로 보낼 메시지 내용 추가 */
          let msg = "";

          /**
           * 새로운 정보 저장하기
           * @param setFun 변수에 저장할 기능
           * @param dataNum ex) data.token1000
           */
          const setTokenNum = (setFun, dataNum) => {
            if (dataNum == null) {
              setFun("-");
            } else {
              setFun(dataNum);
              msg += dataNum + " ";
            }
          };

          this.writter = data.writter;
          this.updateDate = data.date;

          setTokenNum((num) => {
            this.token1000 = num;
          }, data.token1000);
          setTokenNum((num) => {
            this.token2000 = num;
          }, data.token2000);
          setTokenNum((num) => {
            this.token3000 = num;
          }, data.token3000);
          setTokenNum((num) => {
            this.token4000 = num;
          }, data.token4000);
          setTokenNum((num) => {
            this.token5000 = num;
          }, data.token5000);

          this.showBriefing = true;

          if (data.memo != "null") {
            msg += data.memo;
            this.memo = data.memo;
          } else {
            this.memo = "";
          }

          new Notification("새로운 오전 마감 번호가 있습니다.", {
            body: msg,
          });

          const { ipcRenderer } = require("electron");
          ipcRenderer.send("win-highligth");
        }
      } else {
        this.showBriefing = false;
      }

      setTimeout(() => {
        this.getData();
      }, 5000);
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