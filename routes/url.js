const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleEntryInTimestamps,
} = require("../controllers/url");

const router = express.Router();

// router.post("/", handleGenerateNewShortURL);
router.route("/").post(handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", handleEntryInTimestamps);

module.exports = router;
