const express =require('express');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ganpatibappamorya";

const app= express();

app.use(express.json());

const users = []; 

app.get("/", function(req,res){
  res.sendFile(__dirname+"/frontend.html");
  console.log(__dirname);
});

app.post("/signup",function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  
  if(users.find(user => user.username === username && user.password === password))
  {
    res.json({
      message : "You are already signed up"
    })
  }
  else {
    users.push({
      username : username,
      password : password,
    })
    res.json({
      message : "Signup successfull"
    })
  }
});

app.post("/signin",function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  
  const user = users.find(user => user.username === username && user.password === password);
  if(user)
  {
    const token = jwt.sign({
      username : username,
    },JWT_SECRET);

    res.send({
      token
    })
  }
  else {
    res.sendStatus(403).send({
      message : "Invalid Username or password"
    })
  }
});

function auth(req, res, next) {
  const token = req.headers.token; // Extract the token from 'token' header
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    req.username = decoded.username; // Attach the decoded username to the request
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.get("/me", auth ,function(req,res){
  const user = users.find(user => user.username === req.username); //here we have accessed the username that we sent in the auth 
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    username: user.username,
    password: user.password
  });
});


app.listen(3000);