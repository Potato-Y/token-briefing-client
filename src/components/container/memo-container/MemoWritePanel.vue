<template>
  <div>
    <div class="all-wrap">
      <span class="memo-post-header">새로운 메모 작성</span>
      <div class="memo-post-wrap">
        <div class="memo-content-wrap font-background-transparency">
          <textarea
            name="memocontent"
            class="new-memo-textarea font-background-transparency"
            v-model="memoContents"
            placeholder="여기에 내용을 입력하세요"
          ></textarea>
          <input
            class="memo-save-button"
            type="submit"
            value="저장"
            @click="saveButton"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemoWritePanel",
  props: {
    memoModeChange: Function,
  },
  data() {
    return {
      memoContents: "",
    };
  },
  methods: {
    saveButton() {
      if (this.memoContents == "") {
        return alert("메모에 내용이 없습니다.");
      }

      const { ipcRenderer } = require("electron");

      // api에 보낼 데이터 생성
      let data = "";
      const addData = (id, contents) => {
        // post로 보내기 위해 data에 양식에 맞게 저장한다.
        data += `${id}=${contents}&`;
      };

      addData(
        "writer",
        ipcRenderer.sendSync("get-client-setting", null).userName
      );
      addData("content", `${this.memoContents}`);

      if (ipcRenderer.sendSync("api-memo-upload", data) == true) {
        alert("전송이 완료되었습니다. 곧 업데이트됩니다.");
        this.memoContents = "";
        this.memoModeChange();
      }
    },
  },
};
</script>

<style>
/* 메모 내용 입력 */
.new-memo-textarea {
  width: 98%;
  height: 170px;
  margin-top: 5px;
  resize: none;
  background-color: #ffffff00;
  border: none;
  overflow: overlay;
}

/* 테두리가 생기지 않도록 */
.new-memo-textarea:focus {
  outline: none;
}

/* 스크롤바 디자인 변경 */
.new-memo-textarea::-webkit-scrollbar {
  width: 0.4vw;
}

.new-memo-textarea::-webkit-scrollbar-thumb {
  background-color: hsla(0, 0%, 42%, 0.49);
  border-radius: 100px;
}

.memo-save-button {
  float: right;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;

  background-color: #cfc9b6;
  border: none;
  border-radius: 5px;
}
</style>