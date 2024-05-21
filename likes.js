import { database } from "./request.js";
import { renderComments } from "./render.js";
import { token } from "./api.js";


export function controlLikes() {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!token) {
                alert("autorize");
                return;
              }
            const index = likeButtonElement.dataset.index
            if (database[index].isLiked) {
                database[index].isLiked = !database[index].isLiked
                database[index].likeCount--
            } else {
                database[index].isLiked = !database[index].isLiked
                database[index].likeCount++
            };
            renderComments();
            controlLikes()

        });

    };
};