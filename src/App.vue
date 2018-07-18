<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="menu-app">
      <div class="menu-botones">
        <router-link to="/"><p>Camparar caras 👩‍💼🙎‍♂️</p></router-link>
        <router-link to="/train"><p>Entrename 🏋️‍♂️</p></router-link>
        <router-link to="/quien-es"><p>¿Quíen es? 🕵️‍♂️</p></router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import swal from "sweetalert2";
const STATUS_COMPLETED = 0;
let usuario = sessionStorage.getItem("user");
let persona = sessionStorage.getItem("persona");
export default {
  name: "app",
  data() {
    return {
      currentStatus: null,
    };
  },
  computed: {
    isCompleted() {
      return this.currentStatus === STATUS_COMPLETED;
    }
  },
  methods: {
    usuarioCompleted() {
      if (usuario == null || persona == null){
        return false
      }
      return (usuario != "" && persona != "")
    },
    userPopUp: async function() {
      let currentStep;
      let values = [];
      let queValues = [
        {
          title: "Inserte su nombre",
          text: "Guardaremos su imagen en un modelo global",
          input: "text",
          allowOutsideClick: false
        },
        {
          title: "Persona a guardar",
          text: "Inserte el nombre de la persona a entrenar en nuestra IA",
          input: "text",
          allowOutsideClick: false
        }
      ];
      swal.mixin({
        // confirmButtonText: "Siguiente &rarr;", //con el icono
        confirmButtonText: "Siguiente",
        showCancelButton: false,
        progressSteps: ["1", "2"],
        allowOutsideClick: false
      });

      for (currentStep = 0; currentStep < 2; ) {
        await swal.queue([queValues[currentStep]]).then(result => {
          if (result.value == "") {
            return currentStep;
          } else {
            values.push(result.value[0]);
            currentStep++;
          }
        });
      }
      let user = values[0].toLowerCase();
      let persona = values[1].toLowerCase();
      let datos = { user, persona };
      sessionStorage.setItem("user", user);
      sessionStorage.setItem("persona", persona);
      this.currentStatus = true;
      this.$store.dispatch("setName", datos);
    }
  },
  beforeMount() {
    let exist = this.usuarioCompleted()
    let datos = {
      user: usuario,
      persona: persona
    }
    if (exist) {
      this.$store.dispatch('setName', datos)
      }else {
        this.userPopUp();        
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla");
body {
  font-family: "Karla", sans-serif;
  font-weight: 300;
  letter-spacing: 0.5px;
  background-color: rgb(239, 239, 239);
}

.menu-app {
  display: flex;
  justify-content: center;
  text-align: center;
}

.datos {
  padding: 10px;
}

.menu-botones {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.menu-app a {
  width: 190px;
  height: 60px;
  background-color: rgb(76, 197, 182);
  -webkit-box-shadow: 10px 12px 5px -8px rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 10px 12px 5px -8px rgba(0, 0, 0, 0.12);
  box-shadow: 10px 12px 5px -8px rgba(0, 0, 0, 0.12);
  margin-left: 10px;
}
.menu-app a p {
  color: white;
  padding-top: 20px;
}
h1 {
  text-align: center;
  font-family: "Karla", sans-serif;
  font-weight: bold;
  color: rgb(32, 33, 33);
  font-size: 4em;
  // padding-top: 10px;
}
.datos {
  display: flex;
  justify-content: center;
}
span {
  color: #aaa;
}
.datos .usuario {
  text-align: center;
  justify-content: flex-end;
}
input[type="text"] {
  margin: 0px 20px 10px 15px;
  color: #333;
  box-sizing: border-box;
  letter-spacing: 1px;
  background-color: transparent;
}
:focus {
  outline: none;
}
.effect-2 {
  border: 0;
  padding: 7px 0;
  border-bottom: 1px solid #ccc;
}
.effect-2 ~ .focus-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #3399ff;
  transition: 0.4s;
}
.effect-2:focus {
  border-bottom: 1px solid #39d2b4;
  transition: 0.4s;
  left: 0;
}
.error {
  display: flex;
  justify-content: center;
}
.error span {
  color: red;
}
//////
.container {
  display: flex;
  justify-content: center;
  background-color: #39d2b3;
  margin-top: 5%;
}
.centerDropBox {
  display: flex;
  justify-content: center;
  // margin-top: -23px;
}
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  // background: #39d2b4;
  width: 200px;
  height: 200px;
  color: dimgray;
  padding: 0px 0px;
  min-height: 20px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  // background: lightblue; /* when mouse over to the drop zone, change color */
  opacity: 0.9;
}

.dropbox p {
  font-size: 1.5em;
  text-align: center;
  padding: 45px 20px;
}
</style>