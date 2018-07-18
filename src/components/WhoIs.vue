<template>
    <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving || isCompleted">
        <h1>{{ tittle }}</h1>
        <!-- <div class="datos">
          <div class="usuario">
            <input class="effect-2" type="text" :name="usuarioName" @keyup="usuarioCompleted($event.target.value)" placeholder="Usuarios">
            <span class="focus-border"></span>
          </div>
          <div class="persona">
            <input class="effect-2" type="text" :name="personaName" @keyup="personaCompleted($event.target.value)" placeholder="Persona nombre">
            <span class="focus-border"></span>
          </div>
        </div> -->
        <div  v-if="isCompleted" class="error">
          <span>Rellene los campos porfavor</span>
        </div>
        <div class="centerDropBox">
        <div class="dropbox">
          <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial || isCompleted">
              Desliza el archivos aquí<br> o haz click para buscarlo
            </p>
            <p v-if="isSaving">
              Buscando...
            </p>
        </div>
        </div>
      </form>
      <!--SUCCESS-->
      <div v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="(item, index) in uploadedFiles" :key="index">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>
</template>

<script>
// swap as you need
// import { upload } from "./file-upload.fake.service"; // fake service
import { upload } from "@/file-upload.service"; // real service
import { wait } from "@/utils";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3,
  STATUS_NOCOMPLETED = 4;

let STATUS_USUARIO = false,
    STATUS_PERSONA = false;

export default {
  name: "whoIs",
  data() {
    return {
      uploadedFiles: [],
      usuario: "",
      persona:"",
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "field",
      usuarioName: "usuario",
      personaName: "persona",
      tittle: "¿Quíen es? 🕵️‍♂️"
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
    isCompleted() {
      return this.currentStatus === STATUS_NOCOMPLETED;
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    usuarioCompleted(data){
      data !== "" ? STATUS_USUARIO = true : STATUS_USUARIO = false
      this.usuario = data
    },
    personaCompleted(data){ 
      data !== "" ? STATUS_PERSONA = true : STATUS_PERSONA = false
      this.persona = data
    },
    save(formData) {
      // upload data to the server
      if (STATUS_PERSONA == false || STATUS_USUARIO == false) {
        this.currentStatus = STATUS_NOCOMPLETED
        return alert('No completado')
      }

      formData.append(this.usuarioName, this.usuario)
      formData.append(this.personaName, this.persona)
      this.currentStatus = STATUS_SAVING;
      upload(formData)
        .then(wait(1500)) // DEV ONLY: wait for 1.5s
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

      // save it
      this.save(formData);
    }
  },
   created() {
   },
  mounted() {
    this.reset();
  },
  beforeMount(){
    // console.log(this.$store.getters.getUsuario)
    // console.log(this.$store.getters.getPersona)
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Karla");
</style>