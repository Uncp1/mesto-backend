import { getCards, createCard } from "../controllers/cards";
import { Router } from "express";

const router = Router();

router.get("/", getCards);
//router.delete("/:cardId", getUserById);
router.post("/", createCard);

//router.put("/:cardId/likes", getUserById);
//router.delete("/:cardId/likes", getUserById);

export default router;
