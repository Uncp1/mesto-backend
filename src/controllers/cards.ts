import Card from "../models/card";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Types } from "mongoose";

export const getCards = (req: Request, res: Response) => {
  return Card.find({})

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

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = req.body._id;

  return Card.create({ name, link, owner })
    .then((Card) => res.send({ data: Card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
