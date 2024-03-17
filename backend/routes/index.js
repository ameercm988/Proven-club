var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    const data = "PROVEN CLUB LIVE CODING";
    res.status(200).send({
      success: true,
      msg: "PROVEN CLUB LIVE CODING",
      data: data,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      msg: error.msg,
      data: {},
    });
  }
});

module.exports = router;
