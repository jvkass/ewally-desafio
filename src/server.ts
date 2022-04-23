import express, { request, response } from "express";
import { boletosRoutes } from "./routes/boletos.routes";

const app = express();

app.use(express.json());

app.use("/boleto",boletosRoutes);

app.listen(3333, () => console.log("Server is running!"));