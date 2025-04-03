const express = require("express");
const { createMember } = require("../controller/member");

const router = express.Router();

// Route to create a new member
router.post("/add-member", createMember);

module.exports = router;
