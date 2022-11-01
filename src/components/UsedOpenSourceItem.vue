<template>
  <div class="margin-top">
    <div>
      {{ name }}
    </div>
    <div>
      {{ url }}
    </div>
    <div>
      {{ license }}
    </div>
    <span style="cursor: pointer; color: blue" @click="changeShow">{{
      buttonText
    }}</span>
    <div v-show="showFullPhrase == true" class="content">
      {{ licenseFullPhrase }}
    </div>
  </div>
</template>

<script>
export default {
  name: "UsedOpenSourceItem",
  props: {
    name: String,
    url: String,
    license: String,
    licenseFullPhrase: String,
  },
  data() {
    return {
      showFullPhrase: false,
      buttonText: "▶ 전문 보기",
    };
  },
  methods: {
    changeShow() {
      if (this.showFullPhrase == false) {
        this.buttonText = "▼ 전문 닫기";
        this.showFullPhrase = true;
      } else {
        this.buttonText = "▶ 전문 보기";
        this.showFullPhrase = false;
      }
    },
  },
};
</script>

<style>
.margin-top {
  margin-top: 10px;
}

.content {
  white-space: pre-wrap;
}
</style>