// Защита вода 

export const safeMode = (htmlString) => {
    return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  };

// Функция уведомления пользователя 
export function successfully() {
  let notification = document.createElement("div");
  notification.textContent = "РЕГИСТРАЦИЯ ПРОШЛА УСПЕШНО, ТЕПЕРЬ ВЫ МОЖЕТЕ АВТОРИЗОВАТЬСЯ !";
  notification.style.position = "fixed";
  notification.style.top = "5%";
  notification.style.left = "32%";
  // notification.style.transform = "translate(-50%, -50%)";
  // notification.style.background = "#00ff00";
  notification.style.color = "#00FF00";
  notification.style.padding = "30px";
  // notification.style.borderRadius = "5px";
  
  document.body.appendChild(notification);

  setTimeout(function() {  // задержка по времени
    notification.remove();
  }, 5000);
};   