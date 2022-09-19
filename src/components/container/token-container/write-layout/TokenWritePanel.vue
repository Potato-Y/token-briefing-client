<template>
  <div>
    <div className="token-panel-wrap">
      <div className="token-panel-content-wrap font-background-transparency">
        새로운 마감 번호 추가 <br /><br />

        <form class="font-background-transparency" v-on:submit="subSaveButton">
          <label for="token1000" class="font-background-transparency"
            >1000:{{ " " }}</label
          >
          <input
            id="token1000"
            class="input-box input-box-num"
            type="text"
            maxlength="4"
            autocomplete="off"
            oninput="this.value = this.value.replace(/[^0-9]/g, '');"
            @input="tokenNumCheck($event, 1)"
          /><br />
          <label for="token2000" class="font-background-transparency"
            >2000:{{ " " }}</label
          >
          <input
            id="token2000"
            class="input-box input-box-num"
            type="text"
            maxlength="4"
            autocomplete="off"
            oninput="this.value = this.value.replace(/[^0-9]/g, '');"
            @input="tokenNumCheck($event, 2)"
          /><br />
          <label for="token3000" class="font-background-transparency"
            >3000:{{ " " }}</label
          >
          <input
            id="token3000"
            class="input-box input-box-num"
            type="text"
            maxlength="4"
            autocomplete="off"
            oninput="this.value = this.value.replace(/[^0-9]/g, '');"
            @input="tokenNumCheck($event, 3)"
          /><br />
          <label for="token4000" class="font-background-transparency"
            >4000:{{ " " }}</label
          >
          <input
            id="token4000"
            class="input-box input-box-num"
            type="text"
            maxlength="4"
            autocomplete="off"
            oninput="this.value = this.value.replace(/[^0-9]/g, '');"
            @input="tokenNumCheck($event, 4)"
          /><br />
          <label for="token5000" class="font-background-transparency"
            >5000:{{ " " }}</label
          >
          <input
            id="token5000"
            class="input-box input-box-num"
            type="text"
            maxlength="4"
            autocomplete="off"
            oninput="this.value = this.value.replace(/[^0-9]/g, '');"
            @input="tokenNumCheck($event, 5)"
          /><br /><br />
          메모<br />
          <textarea
            name="tokenmemo"
            id="input-memo"
            className="input-box"
            placeholder="여기에 메모를 입력하세요"
          ></textarea>
          <input class="button-upload" type="submit" value="저장" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TokenWritePanel",
  methods: {
    /**
     * 입력한 마감 번호를 확인하여 문제가 있을 경우 강제 수정
     * @param  event
     * @param {Integer} tokenNum 토큰 분류 번호
     */
    tokenNumCheck(event, tokenNum) {
      const inputValue = event.target.value;

      if (inputValue.length != 4) {
        // 4자리가 넘지 않을 경우 입력중이니 return
        return;
      }

      if (tokenNum == 1) {
        // 1000번대의 경우 1000~1999 의 범위를 가진다.
        if (inputValue > 1999) {
          alert("1999보다 클 수 없습니다.");
          event.target.value = 1999;
        }
      } else if (tokenNum == 2) {
        if (inputValue < 2000) {
          alert("2000보다 작을 수 없습니다.");
          event.target.value = 2000;
        } else if (inputValue > 2999) {
          alert("2999보다 클 수 없습니다.");
          event.target.value = 2999;
        }
      } else if (tokenNum == 3) {
        if (inputValue < 3000) {
          alert("2000보다 작을 수 없습니다.");
          event.target.value = 3000;
        } else if (inputValue > 3999) {
          alert("3999보다 클 수 없습니다.");
          event.target.value = 3999;
        }
      } else if (tokenNum == 4) {
        if (inputValue < 4000) {
          alert("4000보다 작을 수 없습니다.");
          event.target.value = 4000;
        } else if (inputValue > 4999) {
          alert("4999보다 클 수 없습니다.");
          event.target.value = 4999;
        }
      } else if (tokenNum == 5) {
        if (inputValue < 5000) {
          alert("5000보다 작을 수 없습니다.");
          event.target.value = 5000;
        } else if (inputValue > 5999) {
          alert("5999보다 클 수 없습니다.");
          event.target.value = 5999;
        }
      }
    },
    // 전송 버튼을 누르면 실행
    subSaveButton(event) {
      event.preventDefault(); // 웹에서 기본적으로 작동하는 기능 제거
      const { ipcRenderer } = require("electron");

      // api에 보낼 데이터 생성
      var data = "";
      const addData = (id, contents) => {
        // post로 보내기 위해 data에 양식에 맞게 저장한다.
        data += `${id}=${contents}&`;
      };

      addData(
        "writer",
        ipcRenderer.sendSync("get-client-setting", null).userName
      );

      const token1000 = event.target.token1000.value;
      const token2000 = event.target.token2000.value;
      const token3000 = event.target.token3000.value;
      const token4000 = event.target.token4000.value;
      const token5000 = event.target.token5000.value;
      const tokenmemo = event.target.tokenmemo.value;

      if (
        token1000 === "" &&
        token2000 === "" &&
        token3000 === "" &&
        token4000 === "" &&
        token5000 === ""
      ) {
        // 번호표 값이 하나라도 입력되지 않은 경우
        return alert("최소 한개 이상의 번호표 값을 입력해주세요.");
      }

      // 4자리의 숫자가 맞는지 확인 후, 맞으면 데이터에 추가
      if (token1000 !== "") {
        if (token1000.length === 4) {
          addData("token1000", token1000);
        } else {
          return alert("1000번대 번호표의 값이 4자리가 아닙니다.");
        }
      }
      if (token2000 !== "") {
        if (token2000.length === 4) {
          addData("token2000", token2000);
        } else {
          return alert("2000번대 번호표의 값이 4자리가 아닙니다.");
        }
      }
      if (token3000 !== "") {
        if (token3000.length === 4) {
          addData("token3000", token3000);
        } else {
          return alert("3000번대 번호표의 값이 4자리가 아닙니다.");
        }
      }
      if (token4000 !== "") {
        if (token4000.length === 4) {
          addData("token4000", token4000);
        } else {
          return alert("4000번대 번호표의 값이 4자리가 아닙니다.");
        }
      }
      if (token5000 !== "") {
        if (token5000.length === 4) {
          addData("token5000", token5000);
        } else {
          return alert("5000번대 번호표의 값이 4자리가 아닙니다.");
        }
      }
      if (tokenmemo !== "") {
        addData("tokenmemo", tokenmemo);
      }

      if (ipcRenderer.sendSync("api-tokenbriefing-upload", data) == true) {
        alert("전송이 완료되었습니다. 곧 업데이트됩니다.");
      }
    },
  },
};
</script>

<style>
@import url("./TokenWriterPanel.css");
</style>