const shortid = require("shortid");
const URL = require("../models/url_model");

async function generateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = shortid();
  const result = await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

async function getAndRedirect(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestap: Date.now() },
      },
    }
  );
  return res.redirect(result.redirectUrl);
}

async function getUrlAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalVisited: result.visitHistory.length,
    timestamp: result.visitHistory,
  });
}
module.exports = { generateShortUrl, getAndRedirect, getUrlAnalytics };
