import express from "express";
import { RequestHandler } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  getFriendRequest,
  getFriends,
  rejectFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "../controllers/friendController";

const router = express.Router();

router.get("/", authenticate as RequestHandler, getFriends as RequestHandler);
router.get(
  "/request",
  authenticate as RequestHandler,
  getFriendRequest as RequestHandler
);
router.post(
  "/send",
  authenticate as RequestHandler,
  sendFriendRequest as RequestHandler
);
router.post(
  "/reject",
  authenticate as RequestHandler,
  rejectFriendRequest as RequestHandler
);
router.post(
  "/accept",
  authenticate as RequestHandler,
  acceptFriendRequest as RequestHandler
);
router.post(
  "/cancel",
  authenticate as RequestHandler,
  cancelFriendRequest as RequestHandler
);
router.post(
  "/remove",
  authenticate as RequestHandler,
  removeFriend as RequestHandler
);
export default router;
