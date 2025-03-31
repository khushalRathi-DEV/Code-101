import {z} from 'zod';
import express from 'express';  

const app = express();

const userProfileSchema = z.object({ // zod schema
  name: z.string().min(3),
  email : z.string().email(),
  password : z.string().min(8)
});

export type FinalUserProfile = z.infer<typeof userProfileSchema>; // zod type ,this could be used to define the type of the req.body

app.put('/user', (req, res) => {
  const {success} = userProfileSchema.safeParse(req.body);
  const updatedBody : FinalUserProfile = req.body;

  if (success) {
    res.send(updatedBody);
  }
  else {
    res.status(400).send("error");
  }
  
})
