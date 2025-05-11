import express from "express";
import pgclient,{connectDb} from './connectDb';

const app = express();
app.use(express.json());
connectDb();
let curr_id : any = null;

//@ts-ignore
app.post("/signup",async (req,res) => {
  const {email,password} = req.body;
  try{
    const INSERTQUERY = (`INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id`);
    //@ts-ignore
    const response = await pgclient.query(INSERTQUERY,[email,password]);
    curr_id = (await response).rows[0].id;
    console.log(curr_id);
    return res.json(response);
  }catch(e){
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }

});

//@ts-ignore
app.post("/address",async(req,res) => {               //demonstrates relationship between tables in postgres sqll 
  try{
    const {street,city,country} = req.body;
    const INSERTQUERY_ADDRESS = (`INSERT INTO ADDRESS (user_id,street,city,country) VALUES ($1,$2,$3,$4)`);
    //@ts-ignore
    const response = await pgclient.query(INSERTQUERY_ADDRESS,[curr_id,street,city,country]);
    console.log(response);
    return res.json(response);
  }catch(e){
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//@ts-ignore
app.post("/demonstrate-transaction",async(req,res) => {   // demonstrates transaction in postgres sql
  try{
    await pgclient.query("BEGIN");
    const {email,password} = req.body;
    const INSERTQUERY = (`INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id`);
    //@ts-ignore
    const response = await pgclient.query(INSERTQUERY,[email,password]);
    curr_id = (await response).rows[0].id;
    console.log(curr_id);
    const {street,city,country} = req.body;
    const INSERTQUERY_ADDRESS = (`INSERT INTO ADDRESS (user_id,street,city,country) VALUES ($1,$2,$3,$4)`);
    //@ts-ignore
    const response = await pgclient.query(INSERTQUERY_ADDRESS,[curr_id,street,city,country]);
    console.log(response);
    await pgclient.query("COMMIT");
    return res.json(response);
  }catch(e){
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
})

//@ts-ignore
app.get("/profile",async(req,res) => {               //demonstrates joins in postgres sqll/
  try{
    const id = req.query.id;
    const SELECTQUERY = (`
      SELECT u.id, u.email , a.street, a.city, a.country 
      FROM users u 
      LEFT JOIN address a ON u.id = a.user_id 
      WHERE u.id = $1
      `);
    const result = await pgclient.query(SELECTQUERY,[id]);
    console.log(result.rows);
    return res.json(result.rows);
  }catch(e){
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000);