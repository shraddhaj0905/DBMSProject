const express = require("express");
const { createMember,loginMember,getAllMemberships } = require("../controller/member");
const {verifyMember}=require("../middlewares/memberAuth");
const router = express.Router();

// Route to create a new member
router.post("/login",loginMember);
router.post("/add-member", createMember);
router.get("/membership",getAllMemberships)
module.exports = router;
