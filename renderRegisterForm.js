import { setToken, } from "./api.js";
import { setUser } from "./main.js";
import { renderLoginForm, } from "./renderLoginForm.js";
import { register } from "./api.js";
// import { renderRegisterForm } from "./request.js";



export const renderRegisterForm = () => {
    const registerAppHtml = document.getElementById("app");
    const registerHtml = `
    <div class="container">
    <div class="add-form">
    <p class="heading">Форма регистрации</p>
      <div class="input">
        <input type="text" id="name-input" class="add-form-input" placeholder="Имя" />
        <input type="text" id="login-input" class="add-form-input" placeholder="Логин" />
        <input type="text" id="password-input" class="add-form-input" placeholder="Пароль" />
      </div>
      <br />
      <button  id="register-button" class="register-button">Зарегистрироваться</button>
      <br />
      <button id="login-form-button" class="add-form-button">Войти</button>
    </div>
    </div>`;
    registerAppHtml.innerHTML = registerHtml;

    const buttonLoginElement = document.getElementById("login-form-button");
    const registerButtonElement = document.getElementById("register-button");




    registerButtonElement.addEventListener("click", () => {
        const nameInnputElement = document.getElementById("name-input");
        const loginInputElement = document.getElementById("login-input");
        const passwordInputElement = document.getElementById("password-input");
        if (!loginInputElement.value || !passwordInputElement.value || !nameInnputElement.value) {
            
            alert("Проверьте оба поля  на заполненность");
            return

        }
        register({
            name: nameInnputElement.value,
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                setUser(responseData.user.name);
                setToken(responseData.user.setToken);
                console.log(responseData.user.name);
                console.log(setToken);
                // renderLoginForm();
            });
    });

    buttonLoginElement.addEventListener("click", () => {

        renderLoginForm()
    });
};

