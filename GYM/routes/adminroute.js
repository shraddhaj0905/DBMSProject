const express = require("express");
const router = express.Router();
const { loginAdmin ,addTrainer,createMembership,getAllMembers,getAllMemberships,getAllTrainers,getAllWorkoutPlans,buyMembership} = require("../controller/admin");
const {verifyAdmin} = require("../middlewares/adminAuth");
router.post("/login", loginAdmin);


router.post("/add", addTrainer);
router.post("/membership", createMembership);
router.get("/members", getAllMembers);
router.get("/trainers", getAllTrainers);
router.get("/workouts", getAllWorkoutPlans);
router.get("/memberships", getAllMemberships);
router.post("/buy", buyMembership);
module.exports = router;
