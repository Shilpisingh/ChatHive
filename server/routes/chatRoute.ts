import express from "express";
import {
  accessOrCreateChat,
  getAllUserChats,
} from "../controllers/chatController";
import { RequestHandler } from "express";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/",
  authenticate as RequestHandler,
  getAllUserChats as RequestHandler
);
router.post(
  "/create",
  authenticate as RequestHandler,
  accessOrCreateChat as RequestHandler
);

//router.get("/:id", getUserById);

export default router;
