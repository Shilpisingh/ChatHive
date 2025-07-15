import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/userControllers";
import { RequestHandler } from "express";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticate as RequestHandler, getAllUsers as RequestHandler);
router.post("/login", loginUser as RequestHandler);
router.post("/register", registerUser as RequestHandler);

export default router;
