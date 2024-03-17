const express = require("express");
const router = express.Router();
const connectDB = require("../connection/connection.js");

router.get("/list", async (req, res) => {
  console.log("userlist api");
  try {
    const db = await connectDB(); // Get the database client instance
    const userData = await db.collection("users").find().toArray();
    console.log("userData", userData);
    res.status(200).send({
      success: true,
      msg: "User data",
      data: userData,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
});

module.exports = router;
