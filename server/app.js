const express = require("express");

const exampleRoutes = require("./routes/example.routes");

const { errorNotCaught, errorNotFound } = require("./middleware/error");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

//routes
app.use("/example", exampleRoutes);

app.use(errorNotFound);
app.use(errorNotCaught);


module.exports = app;
