// const name = "Khushal"
// name = "Mayank";  //error , since we have made the name var as const it cannot be changed


// const user = {
//   name : "Khushal",
//   age : 21
// }
// user.name = "Mayank"; // this doesnt throw an error, as we are not changing the address ,we can change thr internal elements fo the object
// user = {
//   name = "mayank",
//   age = 8
// }  // this throws an error as we are trying to change the whole object

// const a = [1,2,4];
// a = [1,2,3]; // this throws an error , as we are trying to change the whole array

// so we can use readonly keyword to make the variables readonly

type User_type = {
  readonly name : string,
  age : number,
  readonly email : string
}

const user8 : User_type = {
  name : "Khushal",
  age : 21,
  email : "oBt6o@example.com"
}  

//user8.name = "Mayank"; // this throws an error


//type User = {
// name : string,
// age : number
// }

//const user : User = Readonly<User> ={
// name : "Khushal",
// age : 21
// }
// intstread of using readonly on particular field we can use the Readonly  keyword on tbe entire obj