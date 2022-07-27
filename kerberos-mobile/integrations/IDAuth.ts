const axios = require("axios");
const baseUrl = "https://api.idanalyzer.com/";
const api = axios.create({
  baseURL: baseUrl,
});
import * as FileSystem from "expo-file-system";
const apiKey = "ETQ4WUCLvndMxgstBXw5VTcxRPUCE9pk";

export default async function ScanId(imageURI: string) {
  console.log(imageURI);
  const filebase64 = await FileSystem.readAsStringAsync(imageURI, {
    encoding: "base64",
  });
  console.log("Encrypted");
  // console.log(base64);
  const res = await api.post("/", {
    apikey: apiKey,
    file_base64: filebase64,
    authenticate: true,
    ocr_scaledown: 2000,
    return_confidence: true,
  });
  console.log(res.data);
  return res.data;
}
