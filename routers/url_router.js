const express = require("express");
const urlRouter = express.Router();
const {
  generateShortUrl,
  getAndRedirect,
  getUrlAnalytics,
} = require("../controllers/url_controller");

urlRouter.post("/", generateShortUrl);

urlRouter.get("/:shortId", getAndRedirect);

urlRouter.get("/analytics/:shortId", getUrlAnalytics);

module.exports = urlRouter;
