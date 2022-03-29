import axios from "axios";
const baseUrl = `https://pokeapi.co/api/v2`;
export const $http = axios.create({
  baseURL: baseUrl,
  timeout: 0,
  responseType: `json`,
  headers: {
    Accept: `application/json`,
    "Content-Type": `application/json`,
  },
});
