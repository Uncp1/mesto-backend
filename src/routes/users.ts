import { Router } from 'express';
import {
  getCurrentUser,
  getUser,
  getUsers,
  updateAvatar,
  updateProfile,
} from '../controllers/users';
import { validateAvatar, validateUserData } from '../middleware/validation';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUser);

router.patch('/me/avatar', validateAvatar, updateAvatar);
router.patch('/me', validateUserData, updateProfile);
export default router;
