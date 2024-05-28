const chatText = document.querySelector(".chatbot-input textarea");
const sendBtn = document.querySelector(".chatbot-input span");
const chatBox = document.querySelector(".chatbox");
const chatToggler = document.querySelector(".chatbot-toggler");
const chatClose = document.querySelector(".chatbot-close");

let userMessage;

const createChatLi = (message, classN) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", classN);
    let chatContent = `<p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

function generateResponse() {
    const responses = {
        "sketchers": "У нас в каталоге вы можете найти следующие кроссовки от фирмы Sketchers: <br> Skechers EVA <br> Skechers EVA 2",
        "adidas": "У нас в каталоге вы можете найти следующие кроссовки от фирмы Adidas: <br> Adidas Ultra Boost <br> Adidas x Pharrell Williams Tennis <br> Adidas YEEZY BSKTBL QNTM",
        "balance": "У нас в каталоге вы можете найти следующие кроссовки от фирмы New Balance: <br> New Balance 574 <br> New Balance 530 <br> New Balance MS327CNW",
        "reebok": "У нас в каталоге вы можете найти следующие кроссовки от фирмы Reebok: <br> Question Mid Answer To No One <br> Reebok Pump Omni Zone II",
        "nike" : "У нас в каталоге вы можете найти следующие кроссовки от фирмы Nike: <br> Nike Air Jordan 1 <br> Nike x CLOT Cortez Forrest",
        "выбрать" : "Предлагаю посмотреть на следующие модели: <br> Nike Air Jordan 1 <br> Nike x CLOT Cortez Forrest <br> Reebok Pump Omni Zone II",
        "поможешь?" : "Готов ответить на Ваши вопросы.",
        "привет" : "Здравствуйте, чем могу помочь?",
    };
    var words = userMessage.split(/\s+/);
      
      function match(obj) {
        var matched = Object.keys(obj).find(key => userMessage.toLowerCase().search(key) > -1);
        return obj[matched] || "Извините, не понял вопрос. Не могли бы его перефразировать?";
      }
      
      return match(responses);
}

const handleChat = () => {
    userMessage = chatText.value.trim();
    chatText.value = '';
    if (!userMessage) return;

    chatBox.appendChild(createChatLi(userMessage, "outcome"));
    chatBox.appendChild(createChatLi("Обработка...", "income"));
    chatBox.scrollTo(0, chatBox.scrollHeight);
    chatBox.lastChild.innerHTML = `<p class="chat income">${generateResponse()}</p>`;
    chatText.style.height = `55px`

}

chatText.addEventListener("input", () => {
    chatText.style.height = `${chatText.scrollHeight}px`
});

chatText.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 1240){
        e.preventDefault();
        handleChat();
    }
});

sendBtn.addEventListener("click", handleChat);
chatToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatClose.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));