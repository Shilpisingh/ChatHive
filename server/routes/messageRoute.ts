import express from "express";
import { getMessagesByChatId } from "../controllers/messageControllers";
import { RequestHandler } from "express";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/:chatId",
  authenticate as RequestHandler,
  getMessagesByChatId as RequestHandler
);

export default router;
