import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/userControllers";
import { RequestHandler } from "express";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/", authenticate as RequestHandler, getAllUsers);
router.post("/register", registerUser as RequestHandler);
router.post("/login", loginUser as RequestHandler);

//router.get("/:id", getUserById);

export default router;
