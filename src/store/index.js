import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  getters: {
    getUser(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser
    }
  },
  actions: {
    actionSetUser(context, newUser) {
      context.commit('setUser', newUser)
    }
  },
  modules: {
  }
})
