const express = require("express");

const app = express();
// task --> to add the method ,timestamps and the url it was coming from!!

function loggerMiddleware(req,res, next){
  var ipInfo = getIP(req);
  console.log("Method is" + req.method);
  console.log("Host is" + req.hostname);
  console.log("Route is" + req.url);
  console.log("Ip Address is" + req.ip);
  //console.log("Ip Address is" + ipInfo.clientIp);
  console.log(new Date());
  
  next();
}

app.use(loggerMiddleware); // using middle ware in all the requests below this if we want to exclude this on any one we can write that req above this
app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.get("/multiply", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});

app.listen(3000);