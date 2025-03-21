const { Router } = require("express");
const { model } = require("mongoose");
const  { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../db");

const courseRouter = Router();


courseRouter.get("/preview",async function(req,res){  
  const courses = await courseModel.find({});

  res.json({
    courses
  })


})

courseRouter.post("/purchase",userMiddleware,async function(req,res){  
  const { userId, courseId } = req.body;

  await purchaseModel.create({
    userId,
    courseId
  })

  res.json({
    message : "Course bought successfully"
  })
})

module.exports = {
  courseRouter : courseRouter
}