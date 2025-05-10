import { connectDb } from "./conectdb";
import express from "express";

const app = express();
app.use(express.json());

app.post("/signup", async(req, res) => {
  try {
    const {email, password} = req.body;
    const client = await connectDb();
    const insertQuery =  `INSERT INTO users (email,password) VALUES ($1,$2)`;    // using placeholder to avoid sql injection //parameterized query
    // const insertQuery  = `INSERT INTO USERS (email,password) VALUES (${email} ${password})`;       //this leads to sql injection
    //const response = await client?.query(insertQuery);  
    const response = await client?.query(insertQuery,[email,password]);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
});

// const main = async() => {
//   const client = await connectDb();
// }
// main();
app.listen(3000);
