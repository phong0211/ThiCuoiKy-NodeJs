const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "your-secret-key", resave: true, saveUninitialized: true }));

app.get("/", (req, res) => {
  res.redirect("/login"); 
});

const dashboard = require("./routes/dashboard");
const login = require("./routes/login");
const signup = require("./routes/signup");

app.use("/dashboard", dashboard);
app.use("/login", login);
app.use("/signup", signup);

app.listen(port, hostname, () => {
  console.log(`Hi ${process.env.AUTHOR}. Server is running on port ${port}`);
});

console.log("MONGO_URI:", process.env.MONGO_URI);