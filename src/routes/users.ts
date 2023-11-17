import {
  createUser,
  getUserById,
  getUsers,
  updateAvatar,
  updateUser,
} from "../controllers/users";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);

router.patch("/me/avatar", updateAvatar);
router.patch("/me", updateUser);
export default router;
