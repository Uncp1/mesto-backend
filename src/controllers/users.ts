import User from "../models/user";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

export const getUserById = (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);

  if (!Types.ObjectId.isValid(userId)) {
    return Promise.reject(new Error("Пользователь не существует"));
  } // fix later
  return User.findById(userId)
    .orFail(() => {
      throw new Error("user doesn't exist");
    })
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send(err));
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
