import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { Error, Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-err';
import AuthenticationError from '../errors/auth-err';
import { JWT_SECRET } from '../config';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id.toString(),
        },
        JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );
      res
        .status(StatusCodes.CREATED)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ user, token });
    })
    .catch(next);
};

export const getUsers = (req: Request, res: Response, next: NextFunction) =>
  User.find({})
    .then((users) => res.status(StatusCodes.OK).send({ data: users }))
    .catch(next);

export const getUserById = (
  userId: string,
  res: Response,
  next: NextFunction,
) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestError('Некорректный ObjectId');
  }

  User.findById(userId)
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.status(StatusCodes.OK).send({ data: user }))
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  getUserById(req.params.userId, res, next);
};

export const getCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  getUserById(req.user._id, res, next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  return bcrypt.hash(password, 10).then((hash) =>
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(StatusCodes.CREATED).send({ data: user }))
      .catch((err) => {
        if (err instanceof Error.ValidationError) {
          next(new BadRequestError(err.message));
        } else if (err.code === 11000) {
          next(
            new AuthenticationError(
              'Пользователь с такой почтой уже существует',
            ),
          );
        } else {
          next(err);
        }
      }),
  );
};

const updateUserInfo = (
  req: Request,
  res: Response,
  updateData: Object,
  next: NextFunction,
) => {
  if (!Types.ObjectId.isValid(req.user._id)) {
    throw new BadRequestError('Некорректный ObjectId');
  }

  User.findByIdAndUpdate(req.user._id, updateData, { new: true })
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.status(StatusCodes.OK).send({ data: user }))
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
  next: NextFunction,
) => {
  const updateData = {
    ...req.body,
  };
  updateUserInfo(req, res, updateData, next);
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateData = {
    ...req.body,
  };
  updateUserInfo(req, res, updateData, next);
};
