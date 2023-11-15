import { createUser } from "controllers/users";
import { Router } from "express";

const router = Router();

router.post("/", createUser);

export default router;
