const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const router = Router();

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(500).json({ message: "User already exists" });

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error in user signup", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find({published: true});
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses', err);
    res.status(500).json({message: 'Internal server error'});
  }
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
