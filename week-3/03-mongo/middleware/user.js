const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const username = req.headers["username"];
  const password = req.headers["password"];

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      next();
    } else {
      return res.status(403).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error in userMiddleware", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = userMiddleware;
