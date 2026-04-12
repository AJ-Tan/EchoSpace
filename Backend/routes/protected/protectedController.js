const { checkAuth } = require("../../config/passport/checkAuth");

module.exports.indexController = [
  checkAuth,
  (req, res) => {
    res.json({
      ok: true,
      message: "Authorized.",
      user: {
        id: req.user.id,
        name: req.user.name,
        role: req.user.role,
      },
    });
  },
];
