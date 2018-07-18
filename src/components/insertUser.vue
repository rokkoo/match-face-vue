<template>
    <div class="datos">
        <div class="usuario">
            <input class="effect-2" type="text" :name="usuarioName" @keyup="comprobarUsuario($event.target.value, $event.target.name)" placeholder="Usuarios">
            <span class="focus-border"></span>
            </div>
            <div class="persona">
            <input class="effect-2" type="text" :name="personaName" @keyup="comprobarUsuario($event.target.value, $event.target.name)" placeholder="Persona nombre">
            <span class="focus-border"></span>
        </div>
    </div>
</template>
<script>
export default {
  name: "insertUser",
  data() {
    return {
      usuarioName: "usuario",
      personaName: "persona",
      usuario: "",
      persona: "",
      textCompleted: false
    };
  },
  methods: {
      comprobarUsuario(value, name) {
        let datos = {value, name}
        this.$store.dispatch('setName', datos)
      }
  }
};
</script>
