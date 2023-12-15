import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-error';
import AuthenticationError from '../errors/auth-err';
import BadRequestError from '../errors/bad-request-err';

export const getCards = (req: Request, res: Response, next: NextFunction) =>
  Card.find({})
    .populate('owner')
    .then((Cards) => res.send({ data: Cards }))
    .catch(next);

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  if (!Types.ObjectId.isValid(cardId)) {
    throw new BadRequestError('Некорректный ObjectId');
  }

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
        return;
      }

      if (userId !== card.owner.toString()) {
        next(
          new AuthenticationError(
            'Можно удалять только те карточки, которые были созданы вами',
          ),
        );
        return;
      }

      Card.findByIdAndDelete(cardId)
        .then(() => res.status(StatusCodes.OK).send({ message: 'Пост удалён' }))
        .catch(next);
    })
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  if (!Types.ObjectId.isValid(owner)) {
    throw new BadRequestError('Некорректный ObjectId');
  }

  return Card.create({ name, link, owner })
    .then((card) => res.status(StatusCodes.CREATED).send({ data: card }))
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  if (!Types.ObjectId.isValid(cardId)) {
    throw new BadRequestError('Некорректный ObjectId');
  }

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .populate(['likes', 'owner'])
    .then((card) => res.status(StatusCodes.OK).send({ data: card }))
    .catch(next);
};

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  if (!Types.ObjectId.isValid(cardId)) {
    throw new BadRequestError('Некорректный ObjectId');
  }

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .populate(['likes', 'owner'])
    .then((card) => res.status(StatusCodes.OK).send({ data: card }))
    .catch(next);
};
