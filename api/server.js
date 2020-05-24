const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../routes/auth-router");
const userRouter = require("../routes/user-router");
const favRouter = require("../routes/fav-router");

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/favs", favRouter);

server.get("/", (req, res) => {
  res.send("Up and running");
});

module.exports = server;
