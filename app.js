const socketIO = require('socket.io');
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });
    console.log("connected");

    socket.on("disconnect", () => {
        io.emit("user-disconnect", socket.id);
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

module.exports = {
    app,
    server
};
