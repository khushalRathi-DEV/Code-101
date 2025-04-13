import express from 'express';
import mongoose from 'mongoose';
import { ContentModel, UserModel } from './db';
import jwt from 'jsonwebtoken';  
import { JWT_SECRET } from './config';
import { userMiddleware } from './middleware';

const app = express();
app.use(express.json());


async function connectDB() {
  try {
    console.log("Connecting to DB");
    await mongoose.connect("mongodb://127.0.0.1:27017/SecondBrain");
  } catch (error) {
    console.error("error:",error);
  }
}
connectDB();

app.post('/api/v1/signup',async(req,res) => {

  const username = req.body.username;
  const password = req.body.password;

  try{
    await UserModel.create({
      username : username,
      password : password
    })

    res.json({
      message : "User signed up"
    })

  }catch(error){
    res.status(500).json({
      message : "User already exists"
    })
  }

});

app.post('/api/v1/login',async (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({
    username : username,
    password : password
  })
  
  if(existingUser){
    const token = jwt.sign({
      id : existingUser._id
    },JWT_SECRET);

    res.json({
      token : token,
      message : "User logged in successfully"
    })
  } else {
    res.status(401).json({
      message : "Invalid credentials"
    })
  }
});

app.post('/api/v1/content',userMiddleware,async(req,res) => {
  const link = req.body.link;
  const type = req.body.type;
  const title = req.body.title; 
  await ContentModel.create({
    link,
    type,
    title,  
    //@ts-ignore
    userId : req.userId,
    tags : []
  })

  res.json({
    message : "Content Added"
  })

});

app.get('/api/v1/content',userMiddleware,async (req,res) => {
  //@ts-ignore
  const userId = req.userId;
  try{
    const content = await ContentModel.findOne({
      userId : userId
    }).populate("userId",'username');
    res.json({
      content
    })
  }catch(error){
    res.status(403).json({
      message : "Content Not Found",
      error
    })
  }

});

app.delete('/api/v1/content',userMiddleware,async(req,res) => {
  const contentId = req.body.contentId;
  //@ts-ignore
  const userId = req.userId;
  try{
    await ContentModel.deleteMany({
      contentId,
      userId
    })
    res.json({
      message : "Content deleted Successfully"
    })
  }catch(error){
    res.status(401).json({
      message : error
    })
  }
  
})

app.post('/api/v1/brain/share',(req,res) => {

});

app.get('/api/v1/brain/share',(req,res) => {

});

const port = 3000;
app.listen(port,() => {
  console.log(`Server running on localhost:${port}`)
}); 

