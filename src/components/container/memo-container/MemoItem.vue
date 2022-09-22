<template>
  <div>
    <div class="all-wrap">
      <span class="memo-post-header">
        {{ writer }} | {{ date.split(" ")[0] }}
        <span style="font-weight: bold">{{ date.split(" ")[1] }}</span>
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
export default {
  name: "MemoItem",
  props: {
    writer: String,
    date: String,
    content: String,
    memoKey: Number,
  },
  data() {
    return {};
  },
  mounted() {},
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