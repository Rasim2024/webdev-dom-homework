
import { nameInputElement } from "./main.js";
import { reviewInputElement } from "./main.js";
import { baseURL } from "./main.js";
import { safeMode } from "./helpers.js";




export function apiGetComments() {
    return fetch(baseURL, {
        method: "GET"
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return response.json();
            }

            if (response.status === 500) {
                throw new Error("Сервер упал");
                //   return Promise.reject(new Error("Сервер упал"));
            }
        });
};

export function apiPostComments() {
   return fetch(baseURL, {
        method: "POST",
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

