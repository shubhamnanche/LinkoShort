const express = require("express");
const { application } = require("express");
const URL = require("../models/url");
const User = require("../models/user");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/urls", restrictTo("ADMIN"), async (req, res) => {
  const allUrls = await URL.find({}).populate(
    "createdBy",
    "name email role"
  );
  // console.log("All urls");
  // console.log(allUrls);
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
