<template>
  <div class="traffic-light">
    <router-view />
    <LightRed
      :currentTime="this.currentTime"
      :isBright="this.brightColors.red"
    />
    <LightYellow
      :currentTime="this.currentTime"
      :isBright="this.brightColors.yellow"
    />
    <LightGreen
      :currentTime="this.currentTime"
      :isBright="this.brightColors.green"
    />
  </div>
</template>

<script>
import LightRed from "@/components/LightRed";
import LightYellow from "@/components/LightYellow";
import LightGreen from "@/components/LightGreen";

export default {
  name: "TrafficLight",
  components: { LightRed, LightYellow, LightGreen },
  props: [],
  data: () => ({
    brightColors: {
      red: true,
      yellow: false,
      green: false,
    },
    timerIdRed: null,
    timerIdYellow: null,
    timerIdGreen: null,
    currentTime: 3,
    isFirstCycle: false,
    nextLight: null,
  }),
  created() {
    this.intervalToZero();
    localStorage.setItem("isCycleRun", "true");
  },
  beforeMount() {
    console.log("[BeforeMount]");
  },
  mounted() {
    this.initLightParams();
    this.selectBrightColor(this.$route.fullPath);
    this.setCurrentTimeOfLocalStorage();
    console.log("[Mounted] Run traffic light");
  },
  beforeUpdate() {
    console.log("[BeforeUpdate]");
    localStorage.setItem("currentTime", this.currentTime);
  },
  updated() {
    console.log("[Updated]");
  },
  activated() {
    console.log("[Activated]");
  },
  deactivated() {
    console.log("[Deactivated]");
  },
  beforeDestroy() {
    console.log("[BeforeDestroy]");
  },
  destroyed() {
    console.log("[Destroyed]");
  },
  methods: {
    initLightParams() {
      switch (this.$route.fullPath) {
        case "/":
        case "/red":
          this.currentTime = this.$store.state.timeRed;
          this.nextLight = "/yellow";
          this.isFirstCycle = true;
          break;
        case "/yellow":
          this.currentTime = this.$store.state.timeYellow;
          this.nextLight = this.isFirstCycle ? "/green" : "/red";
          break;
        case "/green":
          this.currentTime = this.$store.state.timeGreen;
          this.nextLight = "/yellow";
          this.isFirstCycle = false;
          break;
      }
      console.log("Current route: ", this.$route.path);
    },
    intervalToZero() {
      if (this.currentTime) {
        setTimeout(() => {
          --this.currentTime;
          this.intervalToZero();
          // console.log("This current: ", this.currentTime);
        }, 1000);
      } else {
        // console.log("Count done!");
        // console.log(`Next route: ${this.nextLight}`);
        this.$router.push(this.nextLight);
        this.selectBrightColor(this.$route.fullPath);
        this.initLightParams(this.nextLight);
        // console.log(`Current time: ${this.currentTime}`);
        this.intervalToZero();
      }
    },
    selectBrightColor(path) {
      switch (path) {
        case "/":
        case "/red":
          this.brightColors.red = true;
          this.brightColors.yellow = false;
          this.brightColors.green = false;
          break;
        case "/yellow":
          this.brightColors.red = false;
          this.brightColors.yellow = true;
          this.brightColors.green = false;
          break;
        case "/green":
          this.brightColors.red = false;
          this.brightColors.yellow = false;
          this.brightColors.green = true;
          break;
      }
    },
    setCurrentTimeOfLocalStorage() {
      if (localStorage.getItem("isCycleRun")) {
        this.currentTime = localStorage.getItem("currentTime");
      }
    },
  },
};
</script>

<style scoped>
.traffic-light {
  display: flex;
  flex-direction: column;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 160px;
  margin: 10em auto;
  overflow: hidden;
  border: none;
  -webkit-border-radius: 30px;
  border-radius: 30px;
  color: rgba(255, 255, 255, 1);
  background: #0a0c0c;
  -webkit-box-shadow: 8px 8px 8px 1px rgba(0, 0, 0, 0.3);
  box-shadow: 8px 8px 8px 1px rgba(0, 0, 0, 0.3);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
}
</style>
