const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error("Error in admin signup", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink, published } = req.body;

  if (!title || !description || !price || published === undefined) {
    return res.status(400).json({ message: "Missing required course fields" });
  }
  try {
    const newCourse = new Course({
      title,
      description,
      price,
      imageLink,
      published,
    });
    await newCourse.save();

    res
      .status(201)
      .json({
        message: "Course created successfully",
        courseId: newCourse._id,
      });
  } catch (err) {
    console.error("Error in creating course", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    console.error("Error fetching courses", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
