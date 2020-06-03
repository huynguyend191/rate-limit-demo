const express = require("express");
const rateLimit = require("express-rate-limit");
const throttledQueue = require("throttled-queue");
const bodyParser = require("body-parser");
const app = express();
const throttle = throttledQueue(5, 1000); // at most 5 requests per second.

const rateLimiterApiHome = rateLimit({
  windowMs: 1000, // 1 sec
  max: 10,
  message: "You have exceeded the 10 requests in 1 sec limit!",
  headers: true,
});

const rateLimiterApiNews = rateLimit({
  windowMs: 1000, // 1 sec
  max: 5,
  message: "You have exceeded the 5 requests in 1 sec limit!",
  headers: true,
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", rateLimiterApiHome, (req, res) =>
  res.status(200).json({ message: "Homepage" })
);
app.get("/news", rateLimiterApiNews, (req, res) =>
  res.status(200).json({ message: "Random news" })
);
app.post("/orders", (req, res) => {
  throttle(() => {
    res.status(202).json({ message: `Your order ${req.body.id} is placed` });
  });
});
app.listen(5000, () => console.log("Server running at 5000"));
