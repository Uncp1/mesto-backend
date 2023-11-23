import User from "../models/user";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

export const createUser = (req: Request, res: Response) => {
  // хешируем пароль
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email: req.body.email,
        password: hash, // записываем хеш в базу
      })
    )
    .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
    .catch((err) => res.status(400).send(err));
};
