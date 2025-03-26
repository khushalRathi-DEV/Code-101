// interfaces vs types
// create two types called user and admin
// create a function that takes either user or admin as a parameter , and returns a string saying "hello ,[name]" 

interface Admin {
  name : string,
  permission : string
}

interface User {
  name : string;
  age : number;
}

type UserorAdmin = User | Admin;

function greet_(user : UserorAdmin){
  console.log(user.name);
}


// array in type script
function getMax(nums : number[]){       // this is how numbers arrya is made
  let maxnum = -1000000;
  for(let i =0;i<nums.length;i++){
    if(nums[i] > maxnum){
      maxnum = nums[i];
    }
  }
  return maxnum;
}

getMax([1,-19,243]);

//array of obj example 
interface _Address_{
  street : string;
  city:string;
  country : string;
}

interface _User_ {
  name : string;
  age : number;
  // address : {          --> we could have defined an array of address this wauy
  //   street : string;
  //   city : string;
  //   country : string;
  // }[]
  addresses : _Address_[];   //-->better approach 
}

let user4 : _User_ = {
  name : "Khushal",
  age : 21,
  addresses : []
} 


//question 
// given a array 0f users return the array od uses who are illegal ,user is defined aS below
interface __User__ {
  firstName : string;
  lastName  : string;
  age : number;
}

const legalUsers_ = (user : __User__[]) => {
  let ans = [];
  for(let i = 0;i<user.length;i++){
    if(user[i].age >= 18)
      ans.push(user[i]);
  }
  return ans;
}

let user5 : __User__= {
  firstName : "khushal",
  lastName : "Rathi",
  age: 19
}
let user6 : __User__= {
  firstName : "Mayank",
  lastName : "Rathi",
  age: 8
}

const filteredUsers = legalUsers_([user5,user6]);
console.log(filteredUsers);