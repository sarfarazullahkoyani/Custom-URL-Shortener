const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body || !body.url)
    return res.status(400).json({ error: "url is required" });

  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleEntryInTimestamps(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );
  if (entry) {
    res.redirect(entry.redirectURL);
    // res.send(entry.redirectURL);
  } else {
    res.status(404).send("URL not found");
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleEntryInTimestamps,
};
