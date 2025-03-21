//here we use jwts(json web token) for authentication !!

//we need to install -->npm install jsonwebtoken
const jwt = require('jsonwebtoken');
const JWT_SECRET = "jaishreeram";
const express = require('express');
const app = express();
const users = [];
app.use(express.json()); //middle-ware useed to parse the post body

app.post("/signup", function(req,res){
   const username = req.body.username;
   const password = req.body.password;

  if(users.find(user => user.username===username)){
    res.json({
      message : "You are already signedup!!"
    })
    return;
  }

  users.push({
    username : username,
    password : password
  })
  console.log(users);
  res.json({
    message : "You are signed up!!"
  })
});

app.post("/signin", function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(user => user.username === username && user.password === password);

  if(user)
  {
    const token = jwt.sign({
      username : username
    },JWT_SECRET);
    // user.token = token;    --> now we dont need to store the token in the array/storage as if we want it in the future we can get it back using the JWT_SECRET !!  since jwt is a STATEless token 
    res.send({
        token
    })
    console.log(users); 
  }
  else{
    req.statusCode(403).send({
      message: "Invalid username or password"
    })
  }
});

 // creating an authenticated endpoint
app.get("/me", function(req,res){
  const token = req.headers.token;
  const decodedInfo = jwt.verify(token,JWT_SECRET); //Here the conversion of jwt is happening into username
  const username = decodedInfo.username;


  const user = users.find(user => user.username === username);
  
  if(user)
  {
    res.json({
      username : user.username,
      password : user.password
    })
  }
  else
  {
    res.json({
      message : "Invalid token"
    })
  }
})

app.listen(3000);