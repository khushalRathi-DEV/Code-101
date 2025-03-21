const fs=require("fs");

function fxn(err,content)
  {
    if(err)
      console.log("Error found:"+err);
    else  
      console.log(content);
  }

fs.readFile("hehe.txt","utf-8",fxn);