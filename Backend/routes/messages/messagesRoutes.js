const express = require("express");
const {
  getAllMessages,
  getSelectedMessage,
  insertMessage,
  updateMessage,
  deleteMessage,
  getUserMessages,
} = require("./messagesController");
const router = express.Router();

router.get("/", getAllMessages);
router.get("/:message_id", getSelectedMessage);
router.get("/user/:user_id", getUserMessages);
router.post("/", insertMessage);
router.post("/:id", updateMessage);
router.post("/delete/:id", deleteMessage);

module.exports = router;
