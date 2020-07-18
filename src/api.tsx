import axios from "axios";

const api = axios.create({
  baseURL: "http://dev-front-end-teste.sinersoft.com.br/",
  headers: {
    "Content-Type": "application/json",
  },
  method: "get",
});

export default api;
