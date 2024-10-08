import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const allSocketIds = io.sockets.sockets.keys();
    console.log('All connected socket IDs:', allSocketIds);

    console.log("client count:", io.engine.clientsCount);

    socket.on("update", (element) => {
        socket.broadcast.emit("update", element);
        console.log(element)
    });
    
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        methods: 'GET, POST, PUT, DELETE',
        credentials: true,
    })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

console.log("Express App Started");

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

import canvasRouter from "./routes/canvas.routes.js";
app.use("/api/v1/canvas", canvasRouter);

export { httpServer as app };
