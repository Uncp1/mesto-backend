import {
  createUser,
  getCurrentUser,
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
} from "../middleware/validation";

const router = Router();

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:userId", getUserById);

router.patch("/me/avatar", validateAvatar, updateAvatar);
router.patch("/me", validateUserData, updateProfile);
export default router;
