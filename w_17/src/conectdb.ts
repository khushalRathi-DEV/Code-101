import { Client } from "pg"
const client = new Client("postgresql://neondb_owner:npg_eTYdHhyNu7t3@ep-curly-rain-a4vdd0sn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require");


export const connectDb = async() => {
  try{
    await client.connect();
    console.log("DB connected successfully");

    client.query("CREATE TABLE IF NOT EXISTS users(id serial primary key,email varchar(50) unique not null,password varchar(50) not null);");
    return client
  }catch(e){
    console.log(e);
  }
}