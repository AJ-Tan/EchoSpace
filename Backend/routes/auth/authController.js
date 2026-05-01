const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../../utils/env-variables");
const {
  findUser,
  insertUser,
  updateRole,
  updateProfile,
} = require("../../config/database/login-query");
const {
  validateRegister,
  validateUserInformation,
  validateLoginCredentials,
  validateAdmin,
  validateAvatar,
  validatePasscode,
  validateUpdateProfile,
} = require("./authInputValidator");
const { validationResult } = require("express-validator");

module.exports.signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await findUser({ username });

    if (!user)
      return res
        .status(401)
        .json({ ok: false, message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(401)
        .json({ ok: false, message: "Invalid credentials." });

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1d" });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      ok: true,
      message: "Login success.",
      user: {
        id: user.id,
        username: user.username,
        name: `${user.first_name} ${user.last_name}`,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_id: user.avatar_id,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.signOut = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ ok: true, message: "Logout success." });
};

module.exports.signUpUserInformation = [
  validateUserInformation,
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(401).json({ ok: false, errors: result.array() });

    res.status(200).json({ ok: true });
  },
];

module.exports.signUpLoginCredentials = [
  validateLoginCredentials,
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(401).json({ ok: false, errors: result.array() });

    res.status(200).json({ ok: true });
  },
];

module.exports.signUpAvatar = [
  validateAvatar,
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty())
      return res.status(401).json({ ok: false, errors: result.array() });

    res.status(200).json({ ok: true });
  },
];

module.exports.signUpAdmin = [
  validateAdmin,
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(401).json({ ok: false, errors: result.array() });

    res.status(200).json({ ok: true });
  },
];

module.exports.signUp = [
  validateRegister,
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ ok: false, errors: result.array() });

    try {
      await insertUser(req.body);
      res.status(201).json({ ok: true, message: "Signup success." });
    } catch (err) {
      next(err);
    }
  },
];

module.exports.updateUserProfile = [
  validateUpdateProfile,
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.json({ ok: false, errors: result.array() });
    try {
      await updateProfile(req.body);
      res.status(200).json({ ok: true, message: "Updated profile." });
    } catch (err) {
      next(err);
    }
  },
];

module.exports.switchMember = [
  validatePasscode,
  async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty())
      return res.json({ ok: false, errors: result.array() });

    try {
      await updateRole(req.body.id);
      res
        .status(200)
        .json({ ok: true, message: "Successfully became a member." });
    } catch (err) {
      next(err);
    }
  },
];
