import { Platform } from "react-native";

let baseURL = "https://genesisv1.herokuapp.com/api/v1/";

{
  Platform.OS == "ios"
    ? (baseURL = "https://genesisv1.herokuapp.com/api/v1/")
    : console.log("Other platforms not supported yet");
}

export default baseURL;
