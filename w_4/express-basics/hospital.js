const express = require("express");
const app = express();
app.use(express.json());//used to handle the inputs in the post request
const users=[{        //here we have created a in-memory database
  name : "joe Biden",
  kidneys : [
    {
      healthy:false
    },
    {
      healthy: true
    }  
]
}];

app.get("/" , function(req,res){
  const bidenkidneys = users[0].kidneys;
  const numberOfKidneys = bidenkidneys.length;
  let numberOfHealthyKidneys = 0;

  for(let i=0;i<numberOfKidneys;i++)
  {
    if(bidenkidneys[i].healthy)
      numberOfHealthyKidneys++;
  }
  const numberOfUnHealthyKidneys = numberOfKidneys-numberOfHealthyKidneys;

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnHealthyKidneys
  })
})

app.post("/" ,function(req,res){
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy : isHealthy
  })
  res.json({
    msg : "Done!"
  })

});

app.put("/" , function(req,res){
  for(let i=0;i<users[0].kidneys.length;i++)
    users[0].kidneys[i].healthy = true;
  res.json({
    msg : "Done!"
  })
});

app.delete("/" , function(req,res){
  if(isthereatallabadkidney()){
    const newkidneys = [];
    for(let i=0;i<users[0].kidneys.length;i++){
      if(users[0].kidneys[i].healthy)
        newkidneys.push({
          healthy : true
      })
    }
      users[0].kidneys = newkidneys;
    
      res.json({
        msg : "Done!"
      })
  }
  else
    res.status(411).json({
      msg : "You have no bad kidneys"
  })
});
function isthereatallabadkidney(){
  for(let i=0;i<users[0].kidneys.length;i++){
    if(!users[0].kidneys[i].healthy)
      return true;
  }
  return false;
}

app.listen(3000);