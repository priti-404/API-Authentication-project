const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Demonstration-only memory store. Replace with a database in a real application.
const users = [];
let nextId = 1;

router.post("/register", async (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== "string" || username.trim().length < 3 ||
      typeof password !== "string" || password.length < 8) {
    return res.status(400).json({
      error: "Username must contain at least 3 characters and password at least 8 characters."
    });
  }

  const normalizedUsername = username.trim().toLowerCase();
  if (users.some(user => user.username === normalizedUsername)) {
    return res.status(409).json({ error: "Username already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  users.push({ id: nextId++, username: normalizedUsername, passwordHash });
  return res.status(201).json({ message: "User registered successfully." });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const normalizedUsername = username.trim().toLowerCase();
  const user = users.find(item => item.username === normalizedUsername);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    return res.status(500).json({ error: "Server authentication is not configured." });
  }

  const accessToken = jwt.sign(
    { username: user.username },
    secret,
    { subject: String(user.id), expiresIn: process.env.JWT_EXPIRES_IN || "15m", algorithm: "HS256" }
  );

  return res.json({
    accessToken,
    tokenType: "Bearer",
    expiresIn: process.env.JWT_EXPIRES_IN || "15m"
  });
});

module.exports = router;
