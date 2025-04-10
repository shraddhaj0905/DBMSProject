const express = require("express");
const router = express.Router();
const { loginTrainer,createWorkoutPlan,getAllWorkoutPlans} = require("../controller/trainer");
const {verifyTrainer}=require("../middlewares/trainerAuth");
router.post("/login", loginTrainer);
router.post("/create", verifyTrainer, createWorkoutPlan);
router.get("/workout",verifyTrainer,getAllWorkoutPlans);
module.exports = router;
