
import { nameInputElement } from "./main.js";
import { reviewInputElement } from "./main.js";
import { baseURL,urlApiLogin } from "./main.js";
import { safeMode } from "./helpers.js";




export let token = localStorage.getItem("token");
// console.log(token);
export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => {
  return token;
};

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

export async function apiPostComments() {
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
          throw new Error("Некорректные логинпароль 400");
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

  export async function  register({ name, login, password }) {
    return fetch(urlApiLogin, {
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
          throw new Error("Некорректные логинпароль 400");
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

  

