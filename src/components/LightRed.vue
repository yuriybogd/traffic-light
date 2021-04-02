<template>
  <div
    class="trafficRedLight"
    :class="{
      transparent: !isBright,
      flashing: isTimeToFlash,
    }"
  >
    <LightTimer v-if="isBright" :time="currentTime" />
  </div>
</template>

<script>
import LightTimer from "@/components/LightTimer";

export default {
  name: "LightRed",
  components: {
    LightTimer,
  },
  props: ["currentTime", "isBright"],
  data: () => ({
    isRed: true,
    isTransparent: false,
  }),
  computed: {
    isTimeToFlash() {
      return !!(
        this.currentTime <= this.$store.state.timeFlashing && this.isBright
      );
    },
  },
  methods: {},
};
</script>

<style scoped>
.trafficRedLight {
  width: 120px;
  height: 120px;
  margin: 20px auto 10px auto;
  background: red;
  -moz-border-radius: 60px;
  -webkit-border-radius: 60px;
  border-radius: 60px;
}

.transparent {
  opacity: 0.3;
}

.flashing {
  animation: blink 1s linear infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
