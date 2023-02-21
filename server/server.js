const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

connectDB();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello world!"));
app.listen(port, () => console.log(`Server running on port ${port}`));
