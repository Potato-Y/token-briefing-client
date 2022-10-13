<template>
  <div>
    <div v-if="mainPageLock == false">
      <div class="wrap">
        <TitleBar />
        <div className="item-wrap">
          <router-view />
        </div>
      </div>
    </div>

    <!-- 프로그램 첫 실행 시 필수 진행 사항 -->
    <ReadyView :changeMainPageLock="changeMainPageLock" v-if="mainPageLock == true" />
  </div>
</template>

<script>
import TitleBar from "./components/TitleBar.vue";
import ReadyView from "./views/Ready/ReadyView.vue";

export default {
  name: "App",
  components: {
    TitleBar,
    ReadyView,
  },
  data() {
    return {
      /** 메인 페이지 잠금 상태 */
      mainPageLock: true,
      /** 메인 페이지 잠금 해제 */
      changeMainPageLock: (bool) => {
        this.mainPageLock = bool;

        //잠금 해제와 함께 업데이트 확인
        const { ipcRenderer } = require("electron");
        ipcRenderer.send("api-check-app-update");
      },
    };
  },
};
</script>

<style>
@import "./css-reset.css";
/* css 초기화 */

/* 나눔 스퀘어 굵음 */
@font-face {
  font-family: "NanumSquareRoundEB";
  src: url("/src/assets/font/NanumSquareRoundEB.ttf");
}

/* 나눔 고딕 */
@font-face {
  font-family: "NanumGothic";
  src: url("/src/assets/font/NanumGothic.otf");
}

* {
  margin: 0;
  padding: 0;
  font-family: "NanumGothic" !important;
  /* 폰트 적용 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #9fb1bc;
}

.wrap {
  width: 100%;
  height: 100%;
}

.item-wrap {
  margin: 0 auto;
  /* width: 1000px; */
}

/* 파란 밑줄 없애기 */
.navlink-to-reset {
  color: #000000;
  text-decoration: none;
}

/* 기존 내용 삭제 */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
