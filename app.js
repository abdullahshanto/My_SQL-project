const path = require("path");
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const { dbPromise } = require("./config/db");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/donors", require("./routes/stdroutes"));

app.get("/test", (req, res) => {
  res.status(200).send("all ok");
});

app.get("/", (req, res) => {
  res.send("homepage working");
});

const port = process.env.PORT || 8000;

