const express = require("express");
const router = express.Router();
const connectDB = require("../connection/connection.js");

router.get("/getAllBooks", async (req, res) => {
  console.log("library api");
  try {
    const db = await connectDB(); // Get the database client instance
    const bookData = await db.collection("books").find().toArray();
    console.log("bookData", bookData);
    res.status(200).send({
      success: true,
      msg: "User data",
      data: bookData,
    });
  } catch (error) {
    console.error("Error in getAllBooks", error);
    res.status(500).send({
      success: false,
      msg: error.msg,
    });
  }
});

router.get("/checkout", async (req, res) => {
  console.log("checkout api");
  console.log("req.body", req.body);
  try {
    const { memberID, bookID, eventType, fine, created_at } = req.body;
    const dbData = {
      BookID: bookID,
      MemberID: memberID,
      event_type: eventType,
      event_date: created_at,
      fine: fine,
    };
    const db = await connectDB(); // Get the database client instance
    //checking copy availabity
    const copyCheck = await db.collection("books").findOne({ BookID: bookID });
    if (copyCheck.NumberOfCopies == 0) {
      return res.status(200).send({
        success: true,
        msg: "book is out of stock",
      });
    }
    const checkoutData = await db.collection("circulation").insertOne(dbData);
    console.log("checkoutData", checkoutData);
    //hanldinig copies of book
    if (checkoutData?.insertedId) {
      const filter = { BookID: bookID };
      const updateDoc = {
        $inc: {
          price: -1,
        },
      };
      const updateCopies = await db
        .collection("books")
        .updateOne(filter, updateDoc);
      console.log("updateCopies", updateCopies);
    }
    res.status(200).send({
      success: true,
      msg: "book checkout is success",
      data: checkoutData?.insertedId,
    });
  } catch (error) {
    console.error("Error in checkout:", error);
    res.status(500).send({
      success: false,
      msg: error.msg,
    });
  }
});

router.get("/return", async (req, res) => {
  console.log("return api");
  console.log("req.body", req.body);
  try {
    const { memberID, bookID, eventType, fine, created_at } = req.body;
    const dbData = {
      BookID: bookID,
      MemberID: memberID,
      event_type: eventType,
      event_date: created_at,
      fine: fine,
    };
    const db = await connectDB(); // Get the database client instance
    const query = { MemberID: memberID, BookID: bookID };
    const returnStatus = await db.collection("circulation").findOne(query);
    console.log("returnStatus", returnStatus);

    if (returnStatus?.fine >= 0) {
      res.status(200).send({
        success: true,
        msg: "overdue amount persists",
        data: returnStatus,
      });
    }

    const returnData = await db.collection("circulation").insertOne(dbData);
    console.log("returnData", returnData);
    //hanldinig copies of book
    if (returnData?.insertedId) {
      const filter = { BookID: bookID };
      const updateDoc = {
        $inc: {
          price: 1,
        },
      };
      const updateCopies = await db
        .collection("books")
        .updateOne(filter, updateDoc);
      console.log("updateCopies", updateCopies);
    }
    res.status(200).send({
      success: true,
      msg: "book return is success",
      data: returnData?.insertedId,
    });
  } catch (error) {
    console.error("Error in checkout:", error);
    res.status(500).send({
      success: false,
      msg: error.msg,
    });
  }
});

module.exports = router;
