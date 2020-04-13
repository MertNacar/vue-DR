import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    user: {}
  },
  mutations: {
    addCart(state, payload) {
      let isExist = false
      state.cart.map(item => {
        if (item.id === payload.id) {
          item.quantity += payload.quantity
          isExist = true
        }
      })
      if (isExist === false)
        state.cart.push(payload)
    },
    changeQtyCart(state,payload){
      state.cart.map(item => {
        if (item.id === payload.id) {
          item.quantity = payload.quantity
        }
      })
    },
    deleteCartItem(state, payload) {
      let newCart = state.cart.filter(item => {
        item.id != payload.id
      })
      state.cart = newCart
    },
    deleteCartAll(state) {
      state.cart = []
    },
    addUser(state, payload) {
      state.user = payload
    },
    deleteUser(state) {
      state.user = {}
    }
  },
  actions: {
    addCart: ({ commit }, payload) => commit('addCart', payload),
    changeQtyCart: ({ commit }, payload) => commit('changeQtyCart', payload),
    deleteItemCart: ({ commit }, payload) => commit('deleteItemCart', payload),
    deleteAllCart: ({ commit }) => commit('deleteAllCart'),
    addUser: ({ commit }, payload) => commit('addUser', payload),
    deleteUser: ({ commit }) => commit('deleteUser'),
  },
  getters: {
    cart: state => state.cart,
    user: state => state.user
  }
});
