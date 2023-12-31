import { Router } from 'express';
import {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
} from '../controllers/cards';
import { validateNewCard } from '../middleware/validation';

const router = Router();

router.get('/', getCards);

router.post('/', validateNewCard, createCard);
router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

export default router;
