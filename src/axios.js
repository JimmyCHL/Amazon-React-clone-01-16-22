import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-react-clone-01-13-22.cloudfunctions.net/api",
  // "http://localhost:5001/react-clone-01-13-22/us-central1/api", // THE API (cloud function ) URL
});

export default instance;
