import { Client } from "pg"
const pgclient = new Client("postgresql://neondb_owner:**********@ep-curly-rain-a4vdd0sn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require");


export const connectDb = async() => {
  try{
    await pgclient.connect();
    console.log("DB connected successfully");

    await pgclient.query("CREATE TABLE IF NOT EXISTS users(id serial primary key,email varchar(50) unique not null,password varchar(50) not null,created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);");

    await pgclient.query("CREATE TABLE IF NOT EXISTS address (id SERIAL PRIMARY KEY,user_id INTEGER NOT NULL,street VARCHAR(50) NOT NULL ,city VARCHAR(50) NOT NULL,country VARCHAR(20) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);")    //delete cascade means if main parent i.e here the user of that id is delted then the address associaated wiht the id would be deleted automatically,
    // instead we could also have used DELETE STRICT something ike this , in that for deleting the user ,first we would need to clear or delete the childrens first
    return pgclient
  }catch(e){
    console.log(e);
  }
}
export default pgclient;