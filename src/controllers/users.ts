import User from "../models/user";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Types } from "mongoose";

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .populate("card")
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send(err));
};

export const getUserById = (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) {
    return Promise.reject(new Error("Пользователь не существует"));
  }
  return User.findById(userId)
    .populate("card")
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send(err));
};

export const createUser = (req: Request, res: Response) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email: req.body.email,
        password: hash,
      })
    )
    .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
    .catch((err) => res.status(400).send(err));
};
