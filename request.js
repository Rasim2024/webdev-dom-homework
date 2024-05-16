import { renderComments } from "./render.js";
import { apiGetComments } from "./api.js";
import { buttonElement } from "./main.js";
import { loaderElement } from "./main.js";
import { apiPostComments } from "./api.js";
import { nameInputElement } from "./main.js";
import { reviewInputElement } from "./main.js";


export let database = [];
export function getComments() {
    apiGetComments()
        .then((responseData) => {
            loaderElement.remove(); //Удаляем лоадер после загрузки данных
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    time: new Date(comment.date).toLocaleDateString('ru-RU', { year: '2-digit', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    review: comment.text,
                    likeCount: comment.likes,
                    isLiked: false
                };
            });
            database = appComments;
            renderComments();

        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            if (error.message === "Сервер упал") {
                alert("Кажется, что-то пошло не так, попробуй позже");

            } if (error.message === 'Failed to fetch') {
                alert("Кажется,сломался интернет, попробуй позже");
            }
            // Отправлять в систему сбора ошибок
            console.warn(error);

        });

};

export const postComments = () => {
    apiPostComments()
        .then(() => {
            // Выводим новый комментарий из сервера на страницу
            return getComments();
        })
        .then(() => {
            buttonElement.disabled = false
            buttonElement.textContent = 'Написать';

            nameInputElement.value = ""
            reviewInputElement.value = ""

        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            if (error.message === "Неверный запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
            } else if (error.message === "Сервер упал") {
                alert("Кажется, что-то пошло не так, попробуй позже");

            } if (error.message === 'Failed to fetch') {
                alert("Кажется,сломался интернет, попробуй позже");
            }
            // TODO: Отправлять в систему сбора ошибок
            console.warn(error);

        });
};