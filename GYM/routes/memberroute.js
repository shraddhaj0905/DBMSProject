const express = require("express");
const { createMember,loginMember,getAllMemberships ,deleteMember, updateMember} = require("../controller/member");
const {verifyMember}=require("../middlewares/memberAuth");
const router = express.Router();

// Route to create a new member
router.post("/login",loginMember);
router.post("/add-member", createMember);
router.get("/membership",getAllMemberships);
router.post("/delete/:id" , deleteMember);
router.post("/updatemember/:id" , updateMember)
module.exports = router;
