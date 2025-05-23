import { PrismaClient } from "../src/generated/prisma";
import express from "express";
const app = express();
app.use(express.json());

const client = new PrismaClient();
console.log('Client created');

app.get("/users",async(req,res) => {
  try{
    const users = await client.user.findMany();
    res.json(users);
  }catch(e){
    //@ts-ignore
    console.log(e.message);
  }
});

app.get("/todod/:id",async(req,res) => {
  try{
    const id = req.params.id;
    const user = await client.user.findFirst({
      where : {
        id : parseInt(id)
      },
      select : {
        todo : true,
        username : true
      }
    })
    res.json(user);
  }catch(e){
    //@ts-ignore
    console.log(e.message);
  }
});

const insertquery = async() => {
  try{
    const user = await client.user.create({
      data : {
        username : "Khushal",
        password : "121312",
        age : 18,
        city : "Chennai"
      }
    })
    console.log('User created:', user);
  }catch(e){
    //@ts-ignore
    console.log(e.message);
}
}

//insertquery();
app.listen(3000);