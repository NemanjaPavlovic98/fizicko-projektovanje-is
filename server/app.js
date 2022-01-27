const express = require("express");

const radnikRoutes = require("./routes/radnik.routes");
const modelRoutes = require("./routes/model.routes");
const valutaRoutes = require("./routes/valuta.routes");
const mestoRoutes = require("./routes/mesto.routes");

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
app.use("/radnik", radnikRoutes);
app.use("/model", modelRoutes);
app.use("/valuta", valutaRoutes);
app.use("/lokacija", mestoRoutes);

app.use(errorNotFound);
app.use(errorNotCaught);

module.exports = app;
