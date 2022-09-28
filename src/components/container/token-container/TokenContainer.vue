<template>
  <div id="token-container-body">
    <div id="token-container-title">번호표 마감 현황</div>
    <ToeknBriefing />

    <TokenWritePanel />
  </div>
</template>

<script>
import ToeknBriefing from "./briefing-layout/TokenBriefing.vue";
import TokenWritePanel from "./write-layout/TokenWritePanel.vue";
export default {
  name: "TokenContainer",
  methods: {},
  components: { ToeknBriefing, TokenWritePanel },
};
</script>

<style>
@import url("./TokenContainer.css");
</style>