const { checkAuth } = require("../../config/passport/checkAuth");

module.exports.indexController = [
  checkAuth,
  (req, res) => {
    res.json({
      ok: true,
      message: "Authorized.",
      user: {
        id: req.user.id,
        username: req.user.username,
        name: req.user.name,
        avatar_id: req.user.avatar_id,
        role: req.user.role,
      },
    });
  },
];
