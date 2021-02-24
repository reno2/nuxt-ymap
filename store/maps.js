export const state = () => ({
  offices: [],
  r: [1, 2, 4]
});
export const actions = {
  async fetch3({ commit }) {
    //console.log('yyty')
    try {
      const data = await this.$axios.post(
        "http://akademia54.com/vue/filter3.php"
      );
      commit("ADD2", data.data);
    } catch (e) {
      console.log(e);
    }
    //console.log(add)
  },

  // Получаем все новости
  async fetch({ commit, getters }) {
    try {
      // const elements = await this.$axios.$get('http://openserver/api/lk.php');
      const elements = await this.$axios.$get(
        "http://www.avaclinic.loc/offices/nuxt.php"
      );
      //console.log(elements.data);
      commit("ADD_ADDRESSES", elements.data);
    } catch (e) {
      console.log("Request error", e);
    }
  }
};
export const mutations = {
  ADD_ADDRESSES: function(state, data) {
    state.offices = data;
  },

  add(state, text) {
    state.list.push({
      text,
      done: false
    });
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1);
  },
  toggle(state, todo) {
    todo.done = !todo.done;
  }
};
export const getters = {
  getOffices: state => state.offices,
  getPoinByTag: state => tag => {
    // console.log(tag)
    if (tag.length)
      return state.points.filter(point => tag.includes(point.tag));
    return state.points;
  },
  getTotalCount: state => {
    return state.offices.length;
  },
  getCoords: state => tag => {
    console.log(tag);
    if (tag.length)
      return state.coords.filter(point => tag.includes(point.metro));
    else return state.coords;
  }
};
