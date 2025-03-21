const express = require("express");
const {UserModel , TodoModel } =require("./db");
const jwt = require('jsonwebtoken');
const mongoose= require("mongoose");
JWT_SECRET="asdadurk!!321@";

const app = express();
app.use(express.json());
mongoose.connect("mongodb+srv://khushalrathi:qND4ykk5IVXZaqjv@cluster0.bg93l.mongodb.net/todo-app-database")
  .then(()=> console.log("DB connected successfully"))
  .catch((err) => console.log("failed to connect database" ,err))

app.post("/signup", async function(req,res){
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email : email,
    password : password,
    name  : name
   })

   res.json({
    message : "You are signed up"
   })
});

app.post("/signin", async function(req,res){
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email:email,
    password : password
  })

  console.log(user);

  if(user){
    const token = jwt.sign({
      id : user._id.toString()  // userid is of type object it so i need to convert it into string format
     },JWT_SECRET);
    res.json({
      token:token
    })
  }
  else{
    res.status(403).json({
      message: "Incorrect credentials"
    })
  }

});

function auth(req,res,next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);

  if(decodedData)
  {
    req.userId = decodedData.id;
    next();
  }
  else{
    res.status(403).json({
      message : "Incorrect Credentials"
    })
  }
}


app.post("/todo",auth, function(req,res){
  const userId = req.userId ;
  const title = req.body.title;
  const done = req.body.done;

  TodoModel.create({
    userId,
    title,
    done 
  })

  res.json({
    message: "Todo created"
  })


});

app.get("/todos", auth, async function(req,res){
  const userId = req.userId ;
  const todos = await TodoModel.find({
    userId
  });

  res.json({
    todos
  })

});

app.listen(3000,() =>{
  console.log("Server running on port 3000");
});