const express = require("express");
const { createMember,loginMember } = require("../controller/member");

const router = express.Router();

// Route to create a new member
router.post("/login",loginMember);
router.post("/add-member", createMember);

module.exports = router;
