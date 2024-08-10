const express = require("express");
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const app = express();
const PORT = 8001;

//Middleware to parse the url body
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected!")
);

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
