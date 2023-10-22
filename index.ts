import express, { Express, Request, Response } from "express";

import { createServer } from "http";
import { Server } from "socket.io";

import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const port = process.env.PORT;

const io = new Server(httpServer, {
  cors: {
    // Credential is not supported if the CORS header ‘Access-Control-Allow-Origin’ is "origin: *"
    origin: "*",
    // with a single string origin
    // or with an array of origins
    // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("⚡️[server]: Socket id: ", socket.id);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Socket.IO + TypeScript Server is running");
});

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
