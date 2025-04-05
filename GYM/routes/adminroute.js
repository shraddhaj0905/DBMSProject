const express = require("express");
const router = express.Router();
const { loginAdmin ,addTrainer,createMembership,getAllMembers,getAllMemberships,getAllTrainers,getAllWorkoutPlans,buyMembership} = require("../controller/admin");
const {verifyAdmin} = require("../middlewares/adminAuth");
router.post("/login", loginAdmin);


router.post("/add", verifyAdmin, addTrainer);
router.post("/membership", verifyAdmin, createMembership);
router.get("/members", verifyAdmin, getAllMembers);
router.get("/trainers", verifyAdmin, getAllTrainers);
router.get("/workouts", verifyAdmin, getAllWorkoutPlans);
router.get("/memberships", verifyAdmin, getAllMemberships);
router.post("/buy", verifyAdmin, buyMembership);
module.exports = router;
