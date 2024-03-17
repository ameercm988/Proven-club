const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const libraryRouter = require("./routes/library");
const db = require("./connection/connection");

const app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/library", libraryRouter);

// db.main();

db((err) => {
  if (err) console.log("Database not connected" + err);
  else console.log("Database connected successfully");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Start the server
const port = 4444;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
