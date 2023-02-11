const express = require("express");
const router = express.Router();
const { postLogin } = require("../controllers/auth");

router.post("/", postLogin);

module.exports = router;
