const socketIO = require('socket.io')
const express= require('express')
const app = express()
const http = require('http')
var path = require('path');
const { Socket } = require('dgram')

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


const server = http.createServer(app)
const io = socketIO(server)


io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
    io.emit("receive-location",{id:socket.id, ...data })
    });
    console.log("connected");

    socket.on("disconnect",()=>{
        io.emit("user-disconnect",socket.id)
    })
})

app.get('/',(req,res)=>{
    res.render('index')
})

server.listen(3000)

module.exports = app;