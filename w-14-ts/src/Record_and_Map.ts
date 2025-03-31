// type User = {
// name : string;
// age : number
//}

// type Users = {
// [key : string] : User
//}

//const users : Users = {
//  khushal : {name : "Khushal",age : 21}
//  mayank : {name : "Mayank",age : 8}
//}

// THIS feels complex, instead we can use record type, which is a type alias for an object ,it helps us to define the structure of an object

//Record =In TypeScript, the Record type is a utility type that represents an object type with keys and values of a specific type. It is often used when you want to define a type for the keys and values of an object

// Record<Keys, Type>

type User01 = {
name : string;
age : number
}

type Users = Record<string,User01>;
const users : Users = {
  "Khushal" : {name : "Khushal",age : 21},
  "Mayank" : {name : "Mayank",age : 8}
}  
// Map in JS/TS is just like c++ map,just a good way to store key value pairs

const usersMap = new Map<string,User01>();
usersMap.set("Hariom",{name : "Hariom",age : 17});
const user06 = usersMap.get("Hariom");
console.log(user06);