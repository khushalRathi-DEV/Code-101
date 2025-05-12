import { PrismaClient } from "../src/generated/prisma";
const client = new PrismaClient();;

async function createDummyUsers(){
  try{
     await client.user.create({
       data : {
         username : "Khushalrathi",
         password : "121312",
         age : 18,
         city : "Chennai",
         todo : {
           create : [
             {
               title : "First Todo",
               description : "First Todo",
               done : true
             },
             {
               title : "Second Todo",
               description : "Second Todo",
               done : false
             }
           ]
         }
       }
     })
  }catch(e){

  }
}
createDummyUsers();