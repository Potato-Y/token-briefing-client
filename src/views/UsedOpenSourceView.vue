<template>
  사용된 오픈 소스
  <div>
    <!-- 사용한 오픈 소스의 갯수만큼 반복해 배열한다. -->
    <div v-for="(item = item.data, i) in usedOpenSource" :key="i">
      <div>
        {{ item.name }}
      </div>
      <div>
        {{ item.url }}
      </div>
      <div>
        {{ item.license }}
      </div>
      <div>
        {{ item.licenseFullPhrase }}
      </div>
      {{ item.url }}
    </div>
  </div>
</template>

<script>
import OpenSource from "../model/opensource";
export default {
  methods: {
    /** 사용한 오픈 소스 아이템을 추가 */
    putItem() {
      this.usedOpenSource.push(
        new OpenSource(
          "source name",
          "source url",
          "source copyright",
          "source license",
          "source licenseFullPhrase"
        )
      );
    },
  },
  name: "UsedOpenSourceView",
  data() {
    return {
      usedOpenSource: [],
    };
  },
  mounted() {
    this.putItem();
  },
};
</script>