const express = require("express");

const app = express();

app.get("/sum/:a/:b", function(req, es) {   //this is dynamic routing!!
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a + b
    })
});



app.listen(3000);