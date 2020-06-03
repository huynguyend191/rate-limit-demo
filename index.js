const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 60 * 1000, // 24 hrs in milliseconds
  max: 10,
  message: "You have exceeded the 10 requests in 1 minute limit!",
  headers: true,
});

const rateLimiterApi = rateLimit({
  windowMs: 60 * 1000, // 24 hrs in milliseconds
  max: 5,
  message: "You have exceeded the 5 requests in 1 minute limit!",
  headers: true,
});

app.use(rateLimiterUsingThirdParty);

app.get("/", (req, res) => res.status(200).json({ message: "Homepage" }));
app.get("/news", rateLimiterApi, (req, res) =>
  res.status(200).json({ message: "Random news" })
);

app.listen(5000, () => console.log("Server running at 5000"));
