const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route imports
const room = require("./routes/roomRoute");
const user = require("./routes/userRoute");
const booking = require("./routes/bookingRoute");

app.use("/api/v1", room);
app.use("/api/v1", user);
app.use("/api/v1", booking);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
