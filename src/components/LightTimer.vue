<template>
  <div class="light-timer">
    <p class="light-timer-text">{{ time }}</p>
  </div>
</template>

<script>
export default {
  name: "LightTimer",
  props: ["time"],
  data: () => ({
    timer: 10,
  }),
};
</script>

<style scoped>
.light-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
}
.light-timer-text {
  font-size: 48px;
}
</style>
