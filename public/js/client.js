const socket = io();
let name = {};
const textarea = document.getElementById("textarea");
let messageArea = document.querySelector(".message__area");

do {
  name = prompt("please enter your name");
} while (!name); // I have to build a separate section or something for a new user

socket.emit("new-user", name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
   
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom()

  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Recieve

socket.on("message", (msg) => {
  appendMessage(msg , 'incoming')
  scrollToBottom()

});



function scrollToBottom() {
    console.log(messageArea.scrollTop, messageArea.scrollHeight);
    messageArea.scrollTop = messageArea.scrollHeight
}

socket.on("user-connected", (name) => {
    appendMessage({ user: "Chat Bot", message: `${name} has joined the chat.` }, "incoming");
    scrollToBottom();
  });
  