const express = require("express");
const {
  signIn,
  signUp,
  signOut,
  signUpUserInformation,
  signUpLoginCredentials,
  signUpAvatar,
  signUpAdmin,
  switchMember,
  updateUserProfile,
} = require("./authController");
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/signup/validate/user-information", signUpUserInformation);
router.post("/signup/validate/login-credentials", signUpLoginCredentials);
router.post("/signup/validate/avatar", signUpAvatar);
router.post("/signup/validate/admin", signUpAdmin);
router.post("/switch-member", switchMember);
router.post("/update-profile", updateUserProfile);
router.post("/signout", signOut);

module.exports = router;
