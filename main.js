import { getComments } from "./request.js";





export let listElement = document.getElementById('list');


export const baseURL = new URL("https://wedev-api.sky.pro/api/v2/:rasim-musaev/comments");
export const urlApiLogin = new URL("https://wedev-api.sky.pro/api/user/login")
export const urlApiuser = new URL("https://wedev-api.sky.pro/api/user");
export const loaderElement = document.getElementById('preloader')

export let user = JSON.parse(localStorage.getItem("user"));
export const setUser = (newUser) => {
  user = newUser;
};

// Выводим новый комментарий из сервера на страницу

getComments(); 








