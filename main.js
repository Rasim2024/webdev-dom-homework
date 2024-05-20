import { getComments } from "./request.js";
import { publish } from "./button.js";


export const nameInputElement = document.getElementById('name-input');
export const reviewInputElement = document.getElementById('text-input');
export const listElement = document.getElementById('list');
export const buttonElement = document.getElementById('button');
export const baseURL = new URL("https://wedev-api.sky.pro/api/v2/:rasim-musaev/comments");
export const urlApiLogin = new URL("https://wedev-api.sky.pro/api/user/login")

export const loaderElement = document.getElementById('preloader')



// Выводим новый комментарий из сервера на страницу

getComments(); // сохранению в базу данных на сервер 

publish();  // Кнопка публикации с защитой вода. 





