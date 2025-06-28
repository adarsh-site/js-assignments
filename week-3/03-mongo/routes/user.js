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
      return res.status(409).json({ message: "User already exists" });

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
    const courses = await Course.find({ published: true });
    res.status(200).json({courses: courses});
  } catch (err) {
    console.error("Error fetching courses", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers["username"];

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const user = await User.findOne({ username });

    if (user.purchasedCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "You have already purchased this course" });
    }

    user.purchasedCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: "Course purchased successfully" });
  } catch (err) {
    console.error("Error purchasing course", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers["username"];

  try {
    const user = await User.findOne({ username }).populate("purchasedCourses");
    res.status(200).json({ purchasedCourses: user.purchasedCourses });
  } catch (err) {
    console.error("Error fetching course", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
