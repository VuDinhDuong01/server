const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 4000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});
app.use('/',(req,res) =>{
  return res.send('server on')
})
const arrUser = [];
io.on("connection", (socket) => {
  console.log("có người đã kết nỗi:", socket.id);
 

  // socket.on("CLIENT-SEND-NAME", (data) => {
  //   if (arrUser.indexOf(data) >= 0) {
  //     socket.emit("CLIENT-SEND-REGISTER-FAILED");
  //   } else {
  //     arrUser.push(data);
  //     //ai đó đăng ký thành công thì tạo 1 socket để quản lý người dùng
  //     // và tạo thêm  1 username nữa
  //     socket.username = data;
  //     socket.emit("CLIENT-SEND-SUCCESSFULLY", data);
  //     io.sockets.emit("SERVER-SEND-FULL", arrUser);
  //   }
  // });
  // socket.on("CLIENT-LOGOUT", () => {
  //   arrUser.splice(arrUser.indexOf(socket.username), 1);
  //   socket.broadcast.emit("SERVER-SEND-FULL", arrUser);
  // });

  // socket.on("CLIENT-SEND-MESSAGE", (data) => {
  //   io.sockets.emit("SERVER-SEND-MESSAGE", { un: socket.username, nd: data });
  // });

  // socket.on("CLIENT-send-go-chu", () => {
  //   socket.broadcast.emit("SERVER-giửi gõ chữ", { un: socket.username, nd:'đang gõ chữ' });
  // });

    socket.on("CLIENT-CREATE-ZOOM", (data) => {
       
       socket.join(data)
       socket.phong=data
       console.log("zoom:", socket.adapter.rooms);
  });
  socket.on("disconnect", () => {
    console.log("đã có user disconnect", socket.id);
  });
});


httpServer.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
