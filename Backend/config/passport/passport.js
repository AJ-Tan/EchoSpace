const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");
const { secret } = require("../../utils/env-variables");
const { findUser } = require("../database/login-query");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req?.cookies) token = req.cookies["jwt"];
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: secret,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await findUser({ id: payload.id });
      if (!user) return done(null, false, { message: "Unauthorized token." });
      done(null, user);
    } catch (err) {
      done(err);
    }
  }),
);

module.exports = passport;
