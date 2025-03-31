interface User {
  id : string;
  name : string;
  age : number;
  email : string;
  password : string;  
}

type Updated_User = {
  id : number;
  age : string;
}
function updateUser1(user : User){
  // hit the db to update the users
  console.log(user);
}
 // The problem with the above is that we might in future want to change the type of id from string to number or change the type of age from number to string, we have to chnage it everywhere in thr main User interface as well,so we introduce the pick type which helps us to pick the properties we want so we can directly update them at one place

interface User_interface {
  id : string;
  name : string;
  age : number;
  email : string;
  password : string;
}
type UpdateProps = Pick<User_interface,"name" | "email" | "password"> // pick the properties we want to update

function updateUser(user : UpdateProps){
  // hit the db to update the users
  console.log(user);
}

//  Now the problem with the above is that we might not want to update all the properties in updateProps and we might want to update only some of them,so we introduce the partial type

type updateUserOptional = Partial<UpdateProps>

function updateUserOptional(user : updateUserOptional){ 
  // hit the db to update the users
  console.log(user);
}
updateUserOptional({name : "khushal"});