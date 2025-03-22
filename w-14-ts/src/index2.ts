import { StringMappingType } from "typescript";

interface User  {
  name : string,
  age : number,
  address ?: {                //? makes the address obj optional fiedl 
    city : string,
    country : string,
    pincode : number
  }
}

function isLegalUser(user : User) : boolean{
  if(user.age >= 18)
      return true;
  else 
    return false;
}

const user1 : User = {
  name : "Khushal",
  age : 21,
  address : {
    city : "Chennai",
    country : "India",
    pincode : 603203
  }
}

let user2 : User = {
  name : "Tanmay",
  age : 12,
}

console.log(isLegalUser(user1));
console.log(isLegalUser(user2));


//class implements interface

interface Employee_ {
  name : string,
  startDate : Date,
  department : string
}

class TeamLead_ implements Employee {
  name : string;
  startDate : Date;
  department : string;

  constructor(name : string, startDate : Date, department : string) {
    this.name = name;
    this.startDate = startDate;
    this.department = department;
  }
}

let teamLead_ : TeamLead = new TeamLead_("Khushal", new Date(), "Software Developer");
console.log(teamLead_);


//EX-2
interface User_ {
  name : String,
  age : number,
  isLegal() : boolean
}

class Manager_ implements User_ {
  constructor(public name : string , public age : number){        //by writing in front of the params, we dont need to redeclare the variables we have already done in the interfce 
    this.age = age;
    this.name = name;
  }

  isLegal() : boolean{        // fxn keyword is not required inside the clasds
      return this.age > 18;
  }
}

const m = new Manager_("Khushal",21);
console.log(m.isLegal());


//difference between interface and type alias
// --> interface is used to define the structure of an object, while type alias is used to define a custom name for a type
// interface can be used to extend classes, while type alias cannot

//abstract class 
abstract class _User_ {
  name : string;
  constructor (name :string) {
    this.name = name;
  }

  abstract greet() : string;
  hello = () => {
    console.log("hi there");
  }
}

class _Employee_ extends _User_ {
  name : string;
  constructor(name : string){
    super(name);
    this.name = name;
  }
  greet(){
    console.log("hello there");
    return "hi"+"from Khushal";
  }
}

const user3 = new _Employee_("Khushal");
user3.greet(); 
