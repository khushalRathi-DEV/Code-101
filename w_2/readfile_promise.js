const fs=require("fs");
function readthefile(resolve){
  const content=fs.readFile("hehe.txt","utf-8",fxn);
  function fxn(err,content){
    if(err){
      console.log("Error found")
      return;
    }
    else 
      resolve(content);
      
  }
}
function readFile(){
  return new Promise(readthefile);
}
function callback(data){
  console.log(data);
}
const p=readFile();
p.then(callback);

// const fs = require("fs");

// function readFilePromisified(filePath) {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(filePath, "utf-8", function (err, data) {
//       if (err) {
//         reject("Error while reading file");
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }

// function onDone(data) {
//   console.log(data);
// }

// function onError(err) {
//   console.log("Error: " + err);
// }

// readFilePromisified("a.txt").then(onDone).catch(onError);
