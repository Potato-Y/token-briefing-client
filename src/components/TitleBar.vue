<template>
  <div>
    <div id="head-box">
      <span
        id="navlink-home"
        class="navlink-to-reset font-background-transparency"
        style="cursor: pointer"
      >
        Token Briefing
      </span>

      &nbsp;&nbsp;|&nbsp;&nbsp;
      <!-- <router-link>설정</router-link> -->
    </div>
  </div>
</template>

<style>
#head-box {
  width: 100%;
  height: 50px;
  /* min-width: 1000px; */
  background-color: #6e8898;
  display: flex;

  /* 아이템 가운데 정렬 */
  align-items: center;
}

/* 폰트 배경이 달라지는 문제 해결 */
.font-background-transparency {
  background-color: #ffffff00;
}

#navlink-home {
  font-size: 2rem;
  font-family: "NanumSquareRoundEB" !important;
  margin-left: 10px;
}
</style>