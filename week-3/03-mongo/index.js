const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();

const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.PORT;

// Middleware for parsing request bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database", err));

app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
