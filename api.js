
import { safeMode } from "./helpers.js";




export let listElement = document.getElementById('list');
export const baseURL = new URL("https://wedev-api.sky.pro/api/v2/:rasim-musaev/comments");
export const urlApiLogin = new URL("https://wedev-api.sky.pro/api/user/login")
export const urlApiuser = new URL("https://wedev-api.sky.pro/api/user");




export let token = localStorage.getItem("token");
// console.log(token);
export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => {
  return token;
};
// функция обращения к серверу для загрузки листа
export async function apiGetComments() {
    return fetch(baseURL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
          },
    }).then((response) => {
        if (response.status === 401) {
          throw new Error("Вы не авторизованы");
        }
                if (response.status === 200) {
            return response.json();
        }

        if (response.status === 500) {
            throw new Error("Сервер упал");
            //   return Promise.reject(new Error("Сервер упал"));
        }

      })
    
       
};
// Функция обращения к серверу для публикации поста
export async function apiPostComments(nameInputElement, reviewInputElement) {
   return fetch(baseURL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify({
            text: safeMode(reviewInputElement.value),
            name: safeMode(nameInputElement.value),
            forceError: true

        }),
    })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                return response.json();
            }
            if (response.status === 400) {
                throw new Error("Неверный запрос");
                // return Promise.reject(new Error("Неверный запрос"));
            }
            if (response.status === 500) {
                throw new Error("Сервер упал");
                //   return Promise.reject(new Error("Сервер упал"));
            }
        });
};

// функция обращения к серверу для авторизации 
export async function  loginPost({ login, password }) {
    return fetch(urlApiLogin, {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("комменты отрисовались?");
          return response.json();
        }
        if (response.status === 400) {
          throw new Error("неправильный логин или пароль 400");
        }
        if (response.status === 500) {
          return Promise.reject("ошибка сервера");
        }
        return Promise.reject("Отсутствует соединение");
      })
      .catch((error) => {
        alert(error);
        console.warn(error);
      });
  };

//   функция обращения к серверу для регистрации 
  export async function  register({ name, login, password }) {
    console.log(name, login, password);
    return fetch(urlApiuser, {
      method: "POST",
      body: JSON.stringify({
        name,
        login,
        password,
      }),
    })
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          console.log("авторизация?");
          return response.json();
        }
        if (response.status === 400) {
          throw new Error("пользователь с таким логином уже сущетсвует 400");
        }
        if (response.status === 500) {
          return Promise.reject("ошибка сервера");
        }
        return Promise.reject("Отсутствует соединение");
      })
      .catch((error) => {
        alert(error);
        console.warn(error);
      });
  };

  

