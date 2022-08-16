import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == "ios"
    ? (baseURL = "http://localhost:4000/api/v1/")
    : console.log("Other platforms not supported yet");
}

export default baseURL;
