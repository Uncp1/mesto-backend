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

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { CardId } = req.params;

  return (
    Card.findByIdAndDelete(CardId)
      //doesnt work
      .then(() => res.status(200).send({ message: "Пост удалён" }))
      .catch(next)
  );
};

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

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cardId } = req.params;
  const userId = req.body._id;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
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
