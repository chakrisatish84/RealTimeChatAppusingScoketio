var socket = io.connect("http://localhost:3000");
const messageFrom = document.getElementById("sendContainer");
const inputMessage = document.getElementById("message-input");
const messageContainer = document.querySelector(".message-container");

const appendMessage = message => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
};

const name = prompt("What is your name?");
appendMessage("You Joined");
socket.emit("new-user", name);

socket.on("chat-meeage", function(data) {
  appendMessage(`${data.name}: ${data.data}`);
  //   socket.emit('my other event', { my: 'data' });
});

socket.on("user-connected", function(name) {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", function(name) {
  appendMessage(`${name} disconnected`);
});

messageFrom.addEventListener("click", event => {
  event.preventDefault();
  const message = inputMessage.value;
  socket.emit("send-chat-message", message);
  inputMessage.value = "";
});
