const axios = require("axios");
const baseUrl = "https://api.idanalyzer.com/";
const api = axios.create({
  baseURL: baseUrl,
});
import * as FileSystem from "expo-file-system";
const apiKey = "ETQ4WUCLvndMxgstBXw5VTcxRPUCE9pk";

  export default async function ScanFace(face_URI: string, ID_URI: string) {
    console.log(face_URI);
    const facebase64 = await FileSystem.readAsStringAsync(face_URI, {
      encoding: "base64",
    });
    const idbase64 = await FileSystem.readAsStringAsync(ID_URI, {
      encoding: "base64",
    });
  console.log("Encrypted");
  // console.log(base64);
  const res = await api.post("/", {
    apikey: apiKey,
    face_base64: facebase64,
    file_base64: idbase64,
    authenticate: true,
    ocr_scaledown: 2000,
    //return_confidence: true,
    biometric_threshold: 0.70,
  });
  console.log("DATA HERE");
  console.log(res.data);
  return res.data;
}
