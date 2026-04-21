const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport/passport");
const cors = require("cors");

const authRoutes = require("./routes/auth/authRoutes");
const protectedRoutes = require("./routes/protected/protectedRoutes");
const messageRoutes = require("./routes/messages/messagesRoutes");

const { origin, port } = require("./utils/env-variables");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin,
    credentials: true,
  }),
);

app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/message", messageRoutes);

app.use((err, req, res, next) => {
  const status = err?.status || 500;
  const message = err?.message || "Internal server error.";
  if (err) return res.status(status).json({ ok: false, message });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is currently running`);
});
