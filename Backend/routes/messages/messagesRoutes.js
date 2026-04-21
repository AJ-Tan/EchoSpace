const express = require("express");
const {
  getAllMessages,
  getSelectedMessage,
  insertMessage,
  updateMessage,
  deleteMessage,
} = require("./messagesController");
const router = express.Router();

router.get("/", getAllMessages);
router.get("/:message_id", getSelectedMessage);
router.post("/action", insertMessage);
router.post("/action/:id", updateMessage);
router.post("/action/delete/:id", deleteMessage);

module.exports = router;
