<template>
  <div>
    <div class="all-wrap">
      <span class="memo-post-header">
        {{ writer }} | {{ date.split(" ")[0] }}
        <span style="font-weight: bold">{{ date.split(" ")[1] }}</span>
        <span
          style="cursor: pointer; float: right; margin-right: 5px"
          @click="deleteMemo"
          >[삭제]</span
        >
      </span>
      <div class="memo-post-wrap">
        <div class="memo-content-wrap font-background-transparency">
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import log from "electron-log";

export default {
  name: "MemoItem",
  props: {
    writer: String,
    date: String,
    content: String,
    memoKey: Number,
    memoReload: Function,
  },
  methods: {
    deleteMemo() {
      if (!confirm("해당 메모를 삭제하시겠습니까?")) {
        return;
      }

      log.info("메모를 삭제합니다.");

      let data = "";
      const addData = (id, contents) => {
        // post로 보내기 위해 data에 양식에 맞게 저장한다.
        data += `${id}=${contents}&`;
      };

      addData("key", this.memoKey);

      const { ipcRenderer } = require("electron");

      if (ipcRenderer.sendSync("api-memo-delete", data) == true) {
        this.memoReload();
        alert("삭제되었습니다. 곧 반영됩니다.");
      } else {
        alert("삭제에 실패하였습니다.");
      }
    },
  },
};
</script>

<style>
/* 메모 전체 묶음 */
.all-wrap {
  margin-top: 10px;
}

/* 작성자와 시간 */
.memo-post-header {
  margin-left: 5px;
}

/* 메모 내용 전체 묶음 */
.memo-post-wrap {
  background-color: #f4ecd6;
  /* 크기 */
  width: 100%;

  overflow: hidden;
  border-radius: 5px;
  margin-top: 4px;
}

/* 메모 속 컨텐츠 묶음 */
.memo-content-wrap {
  margin: 15px;
  height: 90%;
  overflow: hidden;

  line-height: 130%;
  white-space: pre-wrap;
}
</style>