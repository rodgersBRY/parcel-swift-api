const express = require("express"),
  logger = require("morgan"),
  connectDB = require("./db.config");

require("dotenv").config();

const userRoutes = require("./user.routes");
const parcelRoutes = require("./parcel.routes")

// connect to mongoDB
connectDB();

const app = express(),
  port = process.env.PORT;

app
  .use(logger("dev"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/parcel", parcelRoutes);

// error middleware
app.use((error, _, res, __) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  return res.status(status).json({ message, data });
});

app.listen(port, () => {
  console.log("server is up and listening on port ", port);
});

module.exports = app