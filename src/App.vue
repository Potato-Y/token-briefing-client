<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style>
@import "./css-reset.css"; /* css 초기화 */

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
  font-family: "NanumGothic" !important; /* 폰트 적용 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
