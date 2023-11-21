import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";
import { usersRouter, cardsRouter } from "./routes";

import errorHandler from "./midlware/error-handler";

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use brew services start mongodb-community@4.4
mongoose.connect("mongodb://localhost:27017/mestodb");
mongoose.connection.on("error", (err) => {
  console.log("Failed to connect to MongoDB", err);
});

app.use((req, res, next) => {
  req.body = {
    ...req.body,
    _id: "655551c645aedd49d0386bb8",
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
