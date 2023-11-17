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

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body._id;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .orFail(() => {
      throw new Error("User doesn't exist");
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body._id;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail(() => {
      throw new Error("User doesn't exist");
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};
