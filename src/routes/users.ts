import {
  createUser,
  getUserById,
  getUsers,
  updateAvatar,
  updateProfile,
} from "../controllers/users";
import { Router } from "express";
import {
  validateAvatar,
  validateUserData,
  validateUserProfile,
} from "../middlware/validation";

const router = Router();

router.get("/", getUsers);

router.get("/:userId", getUserById);
router.post("/", validateUserProfile, createUser);

router.patch("/me/avatar", validateAvatar, updateAvatar);
router.patch("/me", validateUserData, updateProfile);
export default router;
