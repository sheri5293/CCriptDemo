const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// In-memory storage for simplicity (replace with a database in a real application)
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

// In-memory storage for Bearer tokens (replace with a secure session management approach)
const bearerTokens = {};

// Middleware to authenticate using Bearer token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token || !bearerTokens[token]) {
    return res.sendStatus(401);
  }

  req.user = bearerTokens[token];
  next();
};

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate a random Bearer token for authentication
  const bearerToken = generateBearerToken();
  bearerTokens[bearerToken] = { username: user.username, id: user.id };

  res.json({ token: bearerToken });
});

// Example protected route
app.get("/api/appointments", authenticateToken, (req, res) => {
  res.json({ message: "Protected endpoint - Appointments data" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Helper function to generate a random Bearer token
function generateBearerToken() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}
