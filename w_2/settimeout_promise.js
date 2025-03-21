// Callback hell
 
// Q: Write code that
// logs hi after 1 second
// logs hello 3 seconds after step 1
// logs hello there 5 seconds after step 2
 

//Solution (has callback hell)

setTimeout(function () {
  console.log("hi");
  setTimeout(function () {
    console.log("hello");

    setTimeout(function () {
      console.log("hello there");
    }, 5000);
  }, 3000);
}, 1000);

//promisfying normal timeout fxn..

function setTimeoutPromisfied(ms){
  return Promise((resolve) =>
    setTimeout(resolve));
}
function callback(){
  console.log("Time has passed");
}
setTimeoutPromisfied(1000).then(callback());

//now solving the question using this 


function setTimeoutPromisfied(ms){
  return Promise((resolve) =>
    setTimeout(resolve));
}
setTimeoutPromisified(1000).then(function () {
  console.log("hi");
  setTimeoutPromisified(3000).then(function () {
    console.log("hello");
    setTimeoutPromisified(5000).then(function () {
      console.log("hello there");
    });
  });
});  // this also doesnt look so good so we can chain the promise one after other

function setTimeoutPromisfied(ms){
  return Promise((resolve) =>
    setTimeout(resolve));
}
setTimeoutPromisfied(1000).then(function(){
  console.log("Hii");
  return setTimeoutPromisfied(3000);
}).then(function(){
  console,log("hello")
  return setTimeoutPromisfied(5000);
}).then(function(){
  console.log("hello there");
});

//now we can also do the above task using what is called a asycn await fxn 
function setTimeoutPromisfied(ms){
  return Promise((resolve) =>
    setTimeout(resolve));
}

async function solve(){
  await setTimeoutPromisfied(1000);
  console.log("hii");
  await setTimeoutPromisfied(3000);
  console.log("Hello");
  await setTimeoutPromisfied(5000);
  console.log("Hello there");
}