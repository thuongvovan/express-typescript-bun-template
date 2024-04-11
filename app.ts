import express from "express";
import net from "net";
import path from "path";
import httpError, { type HttpError } from "http-errors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import "hbs";

import routes from "./routes/index";
import users from "./routes/user";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("env", Bun.env.env);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/users", users);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  const err = httpError(404);
  next(err);
});

// error handlers
// development error handler will print stacktrace
// production error handler no stacktraces leaked to user
app.use(
  (
    err: HttpError,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(err.statusCode || 500);
    if (app.get("env") === "development") {
      res.render("error", {
        message: err.message,
        error: err,
      });
      return;
    }
    res.render("error", {
      message: err.message,
      error: {},
    });
  }
);

app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), function () {
  console.log(
    `Express server listening on port ${
      (server.address() as net.AddressInfo).port
    } as ${app.get("env")} environment.`
  );
});
