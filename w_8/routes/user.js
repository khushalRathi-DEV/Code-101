const { Router } = require('express');
const { userModel, purchaseModel } = require("../db");
const userRouter = Router();
const bcrypt = require('bcrypt');
const { z } = require("zod");
const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');
const { userMiddleware } = require('../middleware/user');

userRouter.post("/signup",async function(req,res){  

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

    await userModel.create({
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
userRouter.post("/signin",async function(req,res){  
  const { email,password } = req.body;
  
  try{
    const user = await userModel.findOne({
      email : email,
    });

    if(user) {
      const passwordMatch = await bcrypt.compare(password,user.password);
      if(passwordMatch){
        const token = jwt.sign({
          id : user._id
        },JWT_USER_PASSWORD);

        res.json({          //try cookie logic here
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
}
catch (error) {
  res.json({
    message : "error",error
  })
}

  
})

userRouter.get("/purchases",userMiddleware,async function(req,res){  
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  })
  res.json({
    purchases // here we need to display the info about the course ,instead of displaying the couse id  
  })
  
})

module.exports = {
  userRouter : userRouter
}