import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timeRed: 10,
    timeYellow: 3,
    timeGreen: 15,
    timeFlashing: 3,
  },
  mutations: {},
  actions: {},
  modules: {},
});
