/* eslint-disable */
import * as axios from "axios";
import { http } from "./axios-config";

async function upload(formData) {
  return await http.post("upload", formData).then(res => {
    alert("Entrenado");
    console.log(res);
  });
}

export { upload };
