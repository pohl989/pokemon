import axios from "axios";
const baseURL = `https://pokeapi.co/api/v2`;
const baseURLSprite = `https://archives.bulbagarden.net/wiki/`;
export const $http = axios.create({
  baseURL,
  timeout: 0,
  responseType: `json`,
  headers: {
    Accept: `application/json`,
    "Content-Type": `application/json`,
  },
});

export const $httpSprites = axios.create({
  baseURL: baseURLSprite,
  timeout: 0,
  responseType: `json`,
  headers: {
    Accept: `application/json`,
    "Content-Type": `application/json`,
  },
});
