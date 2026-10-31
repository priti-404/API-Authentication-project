require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth");
const { requireAuth } = require("./middleware/auth");

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    project: "API Authentication Project",
    status: "running",
    endpoints: ["POST /api/register", "POST /api/login", "GET /api/profile"]
  });
});

app.use("/api", authRoutes);

app.get("/api/profile", requireAuth, (req, res) => {
  res.json({
    message: "Authentication successful. This is a protected endpoint.",
    user: { id: req.user.sub, username: req.user.username }
  });
});

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

const port = Number(process.env.PORT || 3000);
if (require.main === module) {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error("Set JWT_SECRET in .env to a random secret of at least 32 characters.");
    process.exit(1);
  }
  app.listen(port, () => console.log(`API server running at http://localhost:${port}`));
}
module.exports = app;
