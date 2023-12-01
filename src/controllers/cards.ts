import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-error';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .populate('owner')
  .then((Cards) => res.send({ data: Cards }))
  .catch(next);

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  return Card.findByIdAndDelete(cardId)
    .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .then(() => res.status(200).send({ message: 'Пост удалён' }))
    .catch(next);
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
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .populate(['likes', 'owner'])
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = req.body._id;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .populate(['likes', 'owner'])
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};
