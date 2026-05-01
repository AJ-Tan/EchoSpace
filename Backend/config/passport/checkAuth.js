const passport = require("./passport");

module.exports.checkAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    try {
      if (err) return next(err);
      if (!user)
        return res
          .status(400)
          .json({ ok: false, message: "Token is invalid or expired." });
      req.user = {
        id: user.id,
        username: user.username,
        name: `${user.first_name} ${user.last_name}`,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_id: user.avatar_id,
        role: user.role,
      };

      next();
    } catch (err) {
      next(err);
    }
  })(req, res, next);
};
