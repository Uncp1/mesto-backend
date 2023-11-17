import Card from "../models/card";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .populate("owner")
    .then((Cards) => res.send({ data: Cards }))
    .catch((err) => res.status(500).send(err));
};

/*export const getCardById = (req: Request, res: Response) => {
  const { CardId } = req.params;

  if (!Types.ObjectId.isValid(CardId)) {
    return Promise.reject(new Error("Пользователь не существует"));
  }
  return Card.findById(CardId)
    .then((Cards) => res.send({ data: Cards }))
    .catch((err) => res.status(500).send(err));
}; */

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.body._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.body._id;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      throw new Error("card id doesn't exist");
    })
    .populate("likes")
    .populate("owner")
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};
