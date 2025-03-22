let x : number = 10;
console.log(x);

const greet = (name : string) => {  //we can write any ,as type if we wanyt thr fxn to take any type as parameter
  console.log("Hello",name);
}
greet("Khushal");

function sum(a:number,b:number){
  return a+b;
}
console.log(sum(2,4));

function isLegal(age : number) : boolean{ // return val of the fxn
  if(age >= 18)
      return true;   
  else 
      return false;
}
console.log(isLegal(7));

function delayedCall(fn : (name : string) => void){
  setTimeout(fn, 3000);
}
delayedCall(() => greet("Khushal"));

function greetUser(user : {
  name : string,
  age : number
}){
  console.log("Hello",user.name);
}
greetUser({
  name : "Khushal",
  age : 21
}); 

function isEven(num : number) : boolean {
  if(num % 2 === 0){
    return true;
  }
  else
    return false;
}
console.log(isEven(4));

// interface - is a contract to define the structure of an object   
interface Address {
  street : string,
  city : string,
  country : string
}

function getAddress(address : Address){
  console.log(address.street);
  console.log(address.city);
  console.log(address.country);
}
getAddress({
  street : "abc",
  city : "xyz",
  country : "india"
});

// type alias - is a custom name for a type 
type Employee = {
  name : string,
  startDate : Date
}
type Manager = {
  name : string,
  department : string
};
type TeamLead = Employee & Manager;

const teamLead : TeamLead = { 
  name : "Khushal",
  startDate : new Date(),
  department : "Software Developer",
}
console.log(teamLead);
