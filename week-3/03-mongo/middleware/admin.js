const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers["username"];
  const password = req.headers["password"];

  try {
    const admin = await Admin.findOne({ username, password });

    if (admin) {
      next();
    } else {
      return res.status(403).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error in adminMiddleware:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = adminMiddleware;
