<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div id="total-container">
      <div class="token-container">
        <TokenContainer />
      </div>
      <div class="memo-container">
        <MemoContainer />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TokenContainer from "@/components/container/token-container/TokenContainer.vue";
import MemoContainer from "@/components/container/memo-container/MemoContainer.vue";

export default {
  name: "HomeView",
  components: {
    TokenContainer,
    MemoContainer,
  },
};
</script>

<style>
@import url("./HomeView.css");
</style>