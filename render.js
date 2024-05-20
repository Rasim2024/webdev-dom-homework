import { listElement } from "./main.js";
import { replyComments } from "./reply-comments.js";
import { controlLikes } from "./likes.js";
import { database } from "./request.js";
import { setToken, token, getToken } from "./api.js";
import { renderLoginForm } from "./renderLoginForm.js";

export function renderComments() {
  const appHtml = document.getElementById("app");
    listElement.innerHTML = database.map((comment, index) => {
        const classButton = comment.isLiked ? "-active-like" : ""
        return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.time}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text" data-index="${index}" >
              ${comment.review}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter" data-index="${index}">${comment.likeCount}</span>
              <button class="like-button ${classButton}" data-index="${index}"></button>
            </div>
          </div>
        </li>`

    }).join("");

    //Форма ввода комментария
  const contentHtml = () => {
    const btnLogin = `
    <p class="render-login-btn style-autorisation" >  Чтобы добавить комментарий, 
    <a id="render-login-btn">авторизуйтесь</a> </p>`;

    if (!token)
      return `<ul id="comments" class="comments">${listElement}</ul>
     ${btnLogin}`;
    return `<ul id="comments" class="comments">${listElement}</ul>
    <div id="add-form" class="add-form">
      <input id="add-name" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="add-text" type="textArea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="exit-button" class="add-form-button">Выйти</button>
        <button id="add-form-button" class="add-form-button">Написать</button>
        </div>
    </div>
    `;
  };

  appHtml.innerHTML = contentHtml();

  function exit() {
    const exitButton = document.getElementById("exit-button");
    exitButton?.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      renderLoginForm();
    });
  }

    //Переход к форме авторизации по клику
    const setLoginBtn = () => {
      const buttonLoginElement = document.getElementById("render-login-btn");
      if (!buttonLoginElement) {
        return;
      }
      buttonLoginElement.addEventListener("click", (event) => {
        event.preventDefault();
        renderLoginForm();
      });
    };
    setLoginBtn();
    exit();

    // controlLikes();
    // replyComments();

    

};