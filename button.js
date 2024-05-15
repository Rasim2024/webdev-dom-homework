import { buttonElement } from "./main.js";
import { nameInputElement } from "./main.js";
import { reviewInputElement } from "./main.js";
import { postComments } from "./request.js";


export function publish() {
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
};