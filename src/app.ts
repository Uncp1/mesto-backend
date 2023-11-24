import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";
import { usersRouter, cardsRouter, authenticationRouter } from "./routes";
import errorHandler from "./middleware/error-handler";
import NotFoundError from "./errors/not-found-error";
import { JwtPayload } from "jsonwebtoken";
import { requestLogger, errorLogger } from "./middleware/logger";
import auth from "./middleware/auth";
import { DB_ADDRESS } from "./config";
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use brew services start mongodb-community@4.4
mongoose.connect(DB_ADDRESS);
mongoose.connection.on("error", (err) => {
  console.log("Failed to connect to MongoDB", err);
});

app.use(requestLogger);
app.use("/users", auth, usersRouter);
app.use("/cards", auth, cardsRouter);
app.use("/", authenticationRouter);
app.all("/*", () => {
  throw new NotFoundError("страница не найдена");
});

app.use(errors());
app.use(errorHandler);
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
