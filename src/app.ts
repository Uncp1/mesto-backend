import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use brew services start mongodb-community@4.4
mongoose.connect("mongodb://localhost:27017/mestodb");
mongoose.connection.on("error", (err) => {
  console.log("Failed to connect to MongoDB", err);
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
