require('dotenv').config();
const express = require('express');
const { userRouter } =require("./routes/user");
const { courseRouter } =require("./routes/course");


const mongoose = require('mongoose');


const app =express();
app.use(express.json());

app.use("/user",userRouter);
app.use("/admin",userRouter);
app.use("/course",courseRouter);



async function main() {
  await mongoose.connect(process.env.MONGO_URL)
  .then(()=> console.log("DB connected successfully"))
  .catch((err) => console.log("failed to connect database" ,err))
  app.listen(3000,() => {
    console.log("listening on port 3000")
  });
} 
main();