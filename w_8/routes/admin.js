const { Router } = require('express');
const adminRouter = Router();
const { adminModel, courseModel } = require('../db');
const bcrypt = require('bcrypt');
const { z } = require("zod");
const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');
const { adminMiddleware } = require('../middleware/admin');
const error = require('mongoose/lib/error');
adminRouter.post("/signup",async function(req,res) {  

  const requireBody = z.object({
    firstName : z.string().min(3).max(10),
    lastName : z.string().min(3).max(10),
    email : z.string().min(5).max(25).email(),
    password : z.string().min(3).max(25)
  })

  const parsedData = requireBody.safeParse(req.body);
  if(!parsedData.success){
    res.json({
      message : "Invalid Format",
      error : parsedData.error
    })
    return
  }

  const { firstName,lastName,email,password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password,5);

    await adminModel.create({
      firstName : firstName,
      lastName : lastName,
      email : email,
      password : hashedPassword
    });
    res.status(201).json({
      message: "You are signed up"
  });
    
  } catch (error) {
    res.status(500).json({
      message: "User already exists",
      error
    });
  }


})
adminRouter.post("/signin", async function(req,res){  
  const { email,password } = req.body;
  try {
    
    const user = await adminModel.findOne({
      email : email,
    });
  
    if(user) {
      const passwordMatch = await bcrypt.compare(password,user.password);
      if(passwordMatch){
        const token = jwt.sign({
          id : user._id
        },JWT_ADMIN_PASSWORD);
  
        res.json({
          token
        })
    }
      else{
        req.status(403).json({
          message : "Invalid Credentials"
        })
      }
    }
    else {
      req.status(404).json({
        message : "User Not Found!"
      })
      return;
    }
  } catch (error) {
    res.json({
      message : "error",error
    })
  }

})


adminRouter.post("/course",adminMiddleware,async function(req,res){  
  const adminId = req.body.userId;

  const { title,price ,imageUrl,description } = req.body;
  const course = await courseModel.create ({
    title,
    description,
    price,
    imageUrl,
    creatorId : adminId
  })

  res.status(201).json({
    message : "Course created successfully",
    courseId : course._id
  })
})

adminRouter.put("/course",adminMiddleware,async function(req,res){  
  const adminId = req.body.userId;
  const { courseId,title,price ,imageUrl,description } = req.body;

  try{
  const course = courseModel.updateOne({
    _id : courseId,
    creatorId : adminId
  },{
    title,
    description,
    price,
    imageUrl,
  })
  res.json({
    message : "Course Updated Successfully",
    courseId : course._id
  })
}
catch(error){
  message : "error",error
}
  
})


adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){  
  const adminId = req.userId;
  const courses = await courseModel.find({
    creatorId : adminId
  });
  res.json({
    courses
  })
})

module.exports = {
  adminRouter : adminRouter
}



