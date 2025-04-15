const express = require("express");
const router = express.Router();
const { loginAdmin ,addTrainer,deleteMember,deleteTrainer,assignMembership,createMembership,getAllMembers,getAllMemberships,getAllTrainers,getAllWorkoutPlans,createMember,createWorkoutPlan,assignTrainer} = require("../controller/admin");
const {verifyAdmin} = require("../middlewares/adminAuth");
router.post("/login", loginAdmin);
router.post("/create-workout",verifyAdmin,createWorkoutPlan);
router.post("/addmember", verifyAdmin,createMember);
router.post("/add", verifyAdmin,addTrainer);
router.post("/membership",verifyAdmin, createMembership);
router.get("/members", getAllMembers);
router.get("/trainers",getAllTrainers);
router.get("/workouts", getAllWorkoutPlans);
router.get("/memberships", getAllMemberships);
router.post('/assign-trainer',verifyAdmin , assignTrainer);
router.post("/assign-mem",verifyAdmin,assignMembership);


// DELETE Member
router.delete('/member/:id', deleteMember);


// DELETE Trainer
router.delete('/trainer/:id', deleteTrainer);

module.exports = router;
