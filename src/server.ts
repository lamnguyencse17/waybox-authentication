import express from "express";
import mainRouter from "./routers/router";
import { initMongoose } from "./init";
import cors from "cors";
import http from "http";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
initMongoose();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(morgan("tiny"));
app.use(
	cors({
		origin: ["http://localhost:8080", "https://waybox-realtime.herokuapp.com"],
	})
);

app.use("/", mainRouter);

server.listen(port, () => console.log("Running"));
