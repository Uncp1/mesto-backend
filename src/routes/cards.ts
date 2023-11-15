import { getCards, createCard } from "../controllers/cards";
import { Router } from "express";

const router = Router();

router.get("/cards", getCards);
//router.get("/cards/:userId", getUserById);
router.post("/cards", createCard);

export default router;
