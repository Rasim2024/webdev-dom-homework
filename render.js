import { listElement } from "./main.js";
import { replyComments } from "./reply-comments.js";
import { controlLikes } from "./likes.js";
import { database } from "./request.js";

export function renderComments() {
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

    controlLikes();
    replyComments();

};