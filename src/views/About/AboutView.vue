<template>
  <div class="about">
    <div>버전: {{ appVer }}</div>

    <div>
      <router-link to="/opensource">오픈 소스 라이센스</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appVer: "로딩 중",
    };
  },
  methods: {
    getAppVer() {
      const { ipcRenderer } = require("electron");
      this.appVer = ipcRenderer.sendSync("api-get-app-version");
    },
  },
  mounted() {
    this.getAppVer();
  },
};
</script>