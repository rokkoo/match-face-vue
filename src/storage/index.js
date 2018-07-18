/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    usuario: "",
    persona: "",
    usuariosInsertados: false // TODO hacer la compraracion en actions 
  },
  mutations: {
    setUsuario(state, data) {
      state.usuario = data;
    },
    setPersona(state, data) {
      state.persona = data;
    }
  },
  actions: { //async
    setName(state, data) {
      // if (data.name == "usuario") {
      //   state.commit("setUsuario", data.value);
      // } else {
      //   state.commit("setPersona", data.value);
      // }
      // //Comporbamos que tengamos datos en asbas Variavles
      // if (this.state.usuario !== "" && this.state.persona !== "") {
      //   this.state.usuariosInsertados = true
      // }
      state.commit("setUsuario", data.user)
      state.commit("setPersona", data.persona)
      this.state.usuariosInsertados = true
    }
  },
  getters: {
    getUsuario(state) {
      return state.usuario.toLocaleLowerCase();
    },
    getPersona(state) {
      return state.persona.toLowerCase();
    }
  }
});
