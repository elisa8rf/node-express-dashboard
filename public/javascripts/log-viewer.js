const connection = new WebSocket("ws://localhost:3000");
const logWindow = document.querySelector("#log-window");

connection.onopen = function() {
    connection.send("Hello from the client!");
}

connection.onmessage = function(event) {
    logWindow.innerHTML = event.data;
}