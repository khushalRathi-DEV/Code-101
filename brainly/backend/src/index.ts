import express from 'express';
import mongoose from 'mongoose';
import { ContentModel, LinkModel, UserModel } from './db';
import jwt from 'jsonwebtoken';  
import { JWT_SECRET } from './config';
import { userMiddleware } from './middleware';
import {randomString} from './utils';
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

app.post('/api/v1/brain/share',async (req,res) => {
  const share = req.body.share;
  if(share){
      const existingLink = await LinkModel.findOne({
        //@ts-ignore
        userId : req.userId
      })
      if(existingLink){
        res.json({
          message : "/share/"+existingLink.hash
        })
        return;
      }
      const hash = randomString(10);
      await LinkModel.create({
        //@ts-ignore
        userId : req.userId,
        hash
      })
      res.json({
        message : "/share/"+hash
      })
    
  }else{
    await LinkModel.deleteOne({
      //@ts-ignore
      userId : req.userId
    })
    res.json({
      message : "Deleted Successfully"
    })
  }
});

app.get('/api/v1/brain/:shareLink',async(req,res) => {
  const hash = req.params.shareLink;
  try{
    const link = await LinkModel.findOne({
      hash
    })
    if(!link){
      res.status(404).json({
        message : "Brain Not Found"
      })
      return;
    }

    const content = await ContentModel.find({
      userId : link.userId
    })

    const user  = await UserModel.findOne({  
      _id : link.userId
    })
    if(!user){
      res.status(404).json({
        message : "User Not Found"
      })
      return;
    }
    res.json({
      username  : user.username,
      content
    })
  }catch(error){

  }

});

const port = 3000;
app.listen(port,() => {
  console.log(`Server running on localhost:${port}`)
}); 

