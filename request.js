import { renderComments,  } from "./render.js";
import { apiGetComments, token, apiPostComments } from "./api.js";
import { safeMode } from "./helpers.js";

const loaderElement = document.getElementById('preloader')



export let database = [];
//Функция запроса с использованием функ апи и с обработкой ошибок для вывода на экран комментов 
export async function getComments() {
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
            if (token) {
                const publishButton = document.getElementById("add-form-button");
                publishButton.disabled = false;
                publishButton.textContent = "Написать";
            }
            if (error.message === "Сервер упал") {
                alert("Кажется, что-то пошло не так, попробуй позже");

            } if (error.message === 'Failed to fetch') {
                alert("Кажется,сломался интернет, попробуй позже");
            }
            // Отправлять в систему сбора ошибок
            console.warn(error);

        });

};
//Функция запроса с использованием функ апи и с обработкой ошибок для публикации  
export const postComments = () => {
    const nameInputElement = document.getElementById("name-input");
    const reviewInputElement = document.getElementById("text-input");
    const publishButton = document.getElementById("add-form-button");
    apiPostComments(nameInputElement, reviewInputElement)
        .then(() => {
            // Выводим новый комментарий из сервера на страницу
            return getComments();
        })
        .then(() => {
            publishButton.disabled = false
            publishButton.textContent = 'Написать';

            nameInputElement.value = ""
            reviewInputElement.value = ""

        })
        .catch((error) => {
            publishButton.disabled = false;
            publishButton.textContent = "Написать";
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




// console.log(publishButton);
export function publish() {
    const publishButton = document.getElementById("add-form-button");
        publishButton.addEventListener("click", () => {
        const nameInputElement = document.getElementById("name-input");
        const reviewInputElement = document.getElementById('text-input');        
        let errorInName = nameInputElement.value.length <= 2;
        let errorInComment = reviewInputElement.value.length < 2;
        errorInName = safeMode(nameInputElement.value.trim());   //используем функцию trim(), чтобы удалить пробелы из начала и конца введенных значений. 
        errorInComment = safeMode(reviewInputElement.value.trim()); //используем функцию trim(), чтобы удалить пробелы из начала и конца введенных значений.


        nameInputElement.style.backgroundColor = "white";
        reviewInputElement.style.backgroundColor = "white";
        if (errorInName === '' || errorInComment === '') {  // проверяем, не являются ли поля пустыми после удаления пробелов. Если хотя бы одно поле пустое, выводится сообщение об ошибке и запрос не отправляется.
            nameInputElement.style.backgroundColor = "red";
            reviewInputElement.style.backgroundColor = "red";
            alert('Пожалуйста, заполните все поля');
            return;
        }
        publishButton.disabled = true;
        publishButton.textContent = 'Комментарий добавляется...';
        // Сохранение комментариев на сервер

        postComments();

    });
};