import { apiGetComments } from "./api.js";
import { apiPostComments } from "./api.js";
import { renderComments } from "./render.js";
import { getComments } from "./request.js";
import { postComments } from "./request.js";
import { database } from "./request.js";

export const nameInputElement = document.getElementById('name-input');
export const reviewInputElement = document.getElementById('text-input');
export const listElement = document.getElementById('list');
export const buttonElement = document.getElementById('button');
export const baseURL = new URL("https://wedev-api.sky.pro/api/v1/:rasim-musaev/comments");
export const loaderElement = document.getElementById('preloader')



// Выводим новый комментарий из сервера на страницу

getComments();


buttonElement.addEventListener("click", () => {
    let errorInName = nameInputElement.value.length <= 2;
    let errorInComment = reviewInputElement.value.length < 2;
    errorInName = nameInputElement.value.trim();   //используем функцию trim(), чтобы удалить пробелы из начала и конца введенных значений. 
    errorInComment = reviewInputElement.value.trim(); //используем функцию trim(), чтобы удалить пробелы из начала и конца введенных значений.


    nameInputElement.style.backgroundColor = "white";
    reviewInputElement.style.backgroundColor = "white";
    if (errorInName === '' || errorInComment === '') {  // проверяем, не являются ли поля пустыми после удаления пробелов. Если хотя бы одно поле пустое, выводится сообщение об ошибке и запрос не отправляется.
        nameInputElement.style.backgroundColor = "red";
        reviewInputElement.style.backgroundColor = "red";
        alert('Пожалуйста, заполните все поля');
        return;
    }
    buttonElement.disabled = true;
    buttonElement.textContent = 'Комментарий добавляется...';
    // Сохранение комментариев на сервер
    
    postComments();

});



