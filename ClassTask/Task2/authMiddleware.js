const validTokens = []; // store generated tokens temporarily

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  if (!validTokens.includes(token)) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
}

module.exports = { authMiddleware, validTokens };
