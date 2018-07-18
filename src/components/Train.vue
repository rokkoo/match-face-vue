<template>
    <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving || isCompleted">
        <h1 >{{ tittle }}</h1>
        <div class="info">
        <p>Para una experiencia óptima, asegurese de que la o las imagenes que vaya a subir <i>solo aparezca la persona</i> que quieres que la IA reconozca.</p>
        </div>
        <div  v-if="isCompleted" class="error">
          <span>Rellene los campos porfavor</span>
        </div>
        <div class="centerDropBox">
          <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial || isCompleted">
              Desliza el(los) archivos aquí<br> o click para buscarlos
            </p>
            <p v-if="isSaving">
              Subiendo {{ fileCount }} archivos...
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
// import { upload } from "@/file-upload.fake.service"; // fake service
import { upload } from "@/file-upload.service"; // real service
import { wait } from "@/utils";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3,
  STATUS_NOCOMPLETED = 4;

export default {
  name: "train",
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "field",
      tittle: "¿¡Entrename! 🏋️‍♂️"
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
    },
    getName() {
      return this.$store.state.usuario;
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    usuarioCompleted() {
      return this.$store.state.usuariosInsertados;
    },
    save(formData) {
      // upload data to the server
      //TODO ver como envar un objeto por el request al backend
      this.currentStatus = STATUS_SAVING
      formData.append('usuario', this.$store.getters.getUsuario);
      formData.append('persona', this.$store.getters.getPersona);
      upload(formData)
        // .then(wait(1500)) // DEV ONLY: wait for 1.5s
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          // console.log(err.response.data.error.message)
          console.log(err.response)
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      if (this.usuarioCompleted()) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array.from(Array(fileList.length).keys()).map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

        // save it
        //** TODO */
        // Si no existe el suario o la persona volver a preguntar
        this.save(formData);
      }else {
        alert('Volver a preguntar por el user')
      }
    }
  },
  mounted() {
    this.reset();
  },
  beforeMount() {
    // console.log(this.$store.getters.getUsuario)
    // console.log(this.$store.getters.getPersona)
  }
};
</script>

<style lang="scss" scoped>
.info {
  text-align: center;
  margin-top: -20px;
  display: flex;
  justify-content: center;
}
.info p {
  width: 40%;
  opacity: 0.4;
}
</style>