import express, { Express, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import generateSensors, { Sensor } from "./generateSensors";

dotenv.config();

const app: Express = express();
// Opens up CORS for all origins
app.use(cors());

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

let sensors: Sensor[] = [];

const setSensorValues = () => {
  setInterval(() => {
    sensors.forEach(({ id }) => {
      const randomValue = Math.round(Math.random() * 100 * 100) / 100;
      io.emit(`sensor-${id}`, { id, value: randomValue });
    });
  }, 1000);
};

io.on("connection", (socket) => {
  console.log("⚡️[server]: Socket id: ", socket.id);

  socket.on("set-sensors", (value, callback) => {
    console.log("⚡️[server > set-sensors]: ", value);
    sensors = generateSensors(value);
    console.log(
      "Default values: ",
      sensors.map((sensor) => sensor.id).toString()
    );

    callback({ endpoint: "set-sensors", value });
  });

  setSensorValues();
  socket.on("get-sensors", (callback) => {
    console.log("⚡️[server > get-sensors]");
    callback(sensors);
  });
});

app.get("/sensors", (req: Request, res: Response) => {
  console.log("⚡️[server > /sensors]");
  res.send(sensors);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Socket.IO + TypeScript Server is running");
});

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
