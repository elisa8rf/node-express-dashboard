const connection = new WebSocket("ws://localhost:3000");
const logWindow = document.querySelector("#log-window");
const filePath = document.getElementById('logFilePath').value;

connection.onopen = function() {
    connection.send(filePath  ? filePath  : "Hello from the client!");
}

connection.onmessage = function(event) {
    const logs = event.data.split("\n").join("<hr>");
    logWindow.innerHTML = logs;
}