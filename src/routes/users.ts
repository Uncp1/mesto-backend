import { createUser, getUserById, getUsers } from "../controllers/users";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.get("/users/:userId", getUserById);
router.post("/", createUser);

export default router;
