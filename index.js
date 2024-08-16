const express = require("express");
const { connectMongoDb } = require("./connection");
const urlRouter = require("./routers/url_router");
const app = express();
const PORT = 8000;
app.use(express.json());
connectMongoDb("mongodb://127.0.0.1:27017/url-shortener");

app.use("/url", urlRouter);

app.listen(PORT, () => console.log("Server started"));
