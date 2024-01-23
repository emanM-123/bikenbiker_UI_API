import express from "express";
import  { dirname } from 'path';
import { fileURLToPath } from "url";
import {  productRouter } from "../src/router/index.js";
import { connectToDatabase as dbConnect } from "../src/config/index.js";
import { createServer } from "http";

import cors from "cors";
const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Handaling database connection
 */
dbConnect();

// Base route
app.use("/api",productRouter );


app.get("/", (_req, res) => res.send({ message: "Ok" }));

app.get("*", (req, res) => res.status(404).send({ message: "Not found!" }));



const httpServer = createServer(app);

export default httpServer;
