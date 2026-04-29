const { validationResult } = require("express-validator");
const {
  dbAllMessages,
  dbSelectedMessage,
  dbInsertMessage,
  dbUpdateMessage,
  dbDeleteMessage,
  dbUserMessage,
} = require("../../config/database/messages-query");
const { checkAuth } = require("../../config/passport/checkAuth");
const { validateMessage } = require("./messagesValidator");

module.exports.getAllMessages = [
  checkAuth,
  async (req, res, next) => {
    try {
      const rows = await dbAllMessages();

      res.status(200).json({ ok: true, rows });
    } catch (err) {
      next(err);
    }
  },
];

module.exports.getUserMessages = [
  checkAuth,
  async (req, res, next) => {
    try {
      const user_id = req.params.user_id;
      const rows = await dbUserMessage(user_id);

      res.status(200).json({ ok: true, rows });
    } catch (err) {
      next(err);
    }
  },
];

module.exports.getSelectedMessage = [
  checkAuth,
  async (req, res, next) => {
    try {
      const message_id = req.params.message_id;
      const row = await dbSelectedMessage(message_id);

      if (!row) {
        res
          .status(404)
          .json({ ok: false, message: "Message not found or is removed." });
      } else {
        res.status(200).json({ ok: true, item: row });
      }
    } catch (err) {
      next(err);
    }
  },
];

module.exports.insertMessage = [
  checkAuth,
  validateMessage,
  async (req, res, next) => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty())
        return res.status(401).json({ ok: false, errors: result.array() });

      await dbInsertMessage(req.body);
      res.status(201).json({ ok: true, message: "Insert message success." });
    } catch (err) {
      next(err);
    }
  },
];

module.exports.updateMessage = [
  checkAuth,
  validateMessage,
  async (req, res, next) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty())
        return res.status(401).json({ ok: false, errors: result.array() });
      await dbUpdateMessage(req.params.id, req.body);
      res.status(200).json({ ok: true, message: "Update message success." });
    } catch (err) {
      next(err);
    }
  },
];

module.exports.deleteMessage = [
  checkAuth,
  async (req, res, next) => {
    try {
      await dbDeleteMessage(req.body);
      res.status(200).json({ ok: true, message: "Delete message success." });
    } catch (err) {
      next(err);
    }
  },
];
