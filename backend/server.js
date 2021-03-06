const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const port = process.env.BACKEND_PORT || 5000;

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/users", require("./routes/userRoutes.js"));

app.use("/api/chatrooms", require("./routes/chatroomRoutes.js"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
