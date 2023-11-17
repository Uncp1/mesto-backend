import { getCards, createCard, likeCard } from "../controllers/cards";
import { Router } from "express";

const router = Router();

router.get("/", getCards);
//router.delete("/:cardId", getUserById);
router.post("/", createCard);

router.put("/:cardId/likes", likeCard);
//router.delete("/:cardId/likes", getUserById);

export default router;
