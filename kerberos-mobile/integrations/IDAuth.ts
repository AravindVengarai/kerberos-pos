const axios = require("axios");
const baseUrl = "https://api.idanalyzer.com/";
const api = axios.create({
  baseURL: baseUrl,
});
import * as FileSystem from "expo-file-system";
const apiKey = "ETQ4WUCLvndMxgstBXw5VTcxRPUCE9pk";

export default async function Scan(imageURI: string) {
  console.log(imageURI);
  const base64 = await FileSystem.readAsStringAsync(imageURI, {
    encoding: "base64",
  });
  console.log("Encrypted");
  // console.log(base64);
  const res = await api.post("/", {
    apikey: apiKey,
    file_base64: base64,
    authenticate: true,
  });
  console.log(res.data);
  return res.data;
}
