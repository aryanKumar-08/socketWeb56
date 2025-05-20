import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "https://stateshere.netlify.app",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen("5000");



// import { Server } from "socket.io";
// import { createServer } from "http";
// import express from "express";

// const app = express();
// const server = createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: [
//       "https://stateshere.netlify.app",
      
//     ],
//     methods: ["GET", "POST"],
//     credentials: true
//   },
//   transports: ["websocket", "polling"] // Explicitly enable both transports
// });

// let onlineUsers = []; // Fixed variable name (camelCase)

// const addUser = (userId, socketId) => {
//   const userExists = onlineUsers.find((user) => user.userId === userId);
//   if (!userExists) {
//     onlineUsers.push({ userId, socketId });
//   }
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return onlineUsers.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("newUser", (userId) => {
//     addUser(userId, socket.id);
//     console.log(`User ${userId} connected with socket ${socket.id}`);
//   });

//   socket.on("sendMessage", ({ receiverId, data }) => {
//     const receiver = getUser(receiverId);
//     if (receiver) {
//       io.to(receiver.socketId).emit("getMessage", {
//         ...data,
//         chatId: data.chatId || data._id // Ensure chatId is included
//       });
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//     removeUser(socket.id);
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Socket.IO server running on port ${PORT}`);
// });



// import { Server } from "socket.io";

// const io = new Server({
//   cors: {
//     origin: "https://stateshere.netlify.app", // ✅ Production frontend
//   },
// });

// let onlineUser = [];

// const addUser = (userId, socketId) => {
//   const userExists = onlineUser.find((user) => user.userId === userId);
//   if (!userExists) {
//     onlineUser.push({ userId, socketId });
//   }
// };

// const removeUser = (socketId) => {
//   onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return onlineUser.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("newUser", (userId) => {
//     addUser(userId, socket.id);
//   });

//   socket.on("sendMessage", ({ receiverId, data }) => {
//     const receiver = getUser(receiverId);
//     if (receiver) {
//       io.to(receiver.socketId).emit("getMessage", data);
//     }
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//     console.log("User disconnected:", socket.id);
//   });
// });

// io.listen(5000);
