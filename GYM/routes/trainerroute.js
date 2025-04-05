const express = require("express");
const router = express.Router();
const { loginTrainer,createWorkoutPlan } = require("../controller/trainer");
const {verifyTrainer}=require("../middlewares/trainerAuth");
router.post("/login", loginTrainer);
router.post("/create", verifyTrainer, createWorkoutPlan);
module.exports = router;
