const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers");
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;