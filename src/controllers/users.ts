import User from "../models/user";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { Types, Error } from "mongoose";
import NotFoundError from "../errors/not-found-error";
import BadRequestError from "../errors/bad-request-err";
import AuthenticationError from "../errors/auth-err";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  return User.findById(userId)
    .orFail(new NotFoundError("Запрашиваемый пользователь не найден"))
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  return bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => {
        if (err instanceof Error.ValidationError) {
          next(new BadRequestError(err.message));
        } else if (err.code === 11000) {
          next(
            new AuthenticationError(
              "Пользователь с такой почтой уже существует"
            )
          );
        } else {
          next(err);
        }
      })
  );
};

const updateUserInfo = (
  req: Request,
  res: Response,
  updateData: Object,
  next: NextFunction
) => {
  return User.findByIdAndUpdate(req.body._id, updateData, { new: true })
    .orFail(new NotFoundError("Запрашиваемый пользователь не найден"))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateData = {
    ...req.body,
  };
  updateUserInfo(req, res, updateData, next);
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateData = {
    ...req.body,
  };
  updateUserInfo(req, res, updateData, next);
};
