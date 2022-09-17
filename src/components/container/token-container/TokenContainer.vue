<template>
  <div id="token-container-body">
    <div id="token-container-title">번호표 마감 현황</div>
    <ToeknBriefing />
  </div>
</template>

<script>
import ToeknBriefing from "./briefing-layout/ToeknBriefing.vue";
export default {
  name: "TokenContainer",
  methods: {},
  components: { ToeknBriefing },
};
</script>

<style>
@import url("./TokenContainer.css");
</style>