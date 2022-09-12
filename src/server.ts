import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;

//HOBBIES

//get all hobbies and the user that has them
app.get("/hobbies", async (req, res) => {
  const hobbies = await prisma.hobby.findMany({ include: { user: true } });
  res.send(hobbies);
});

// get a single hobby and the user that has it
app.get("/hobbies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const hobby = await prisma.hobby.findUnique({
    where: { id },
    include: { user: true },
  });

  if (hobby) {
    res.send(hobby);
  } else {
    res.status(404).send({ error: "Hobby not found!" });
  }
});


// create a hobby
app.post('/hobbies', async (req, res) => {
   const newHobby = await prisma.hobby.create({data: req.body})
   res.send(newHobby)
})





// USERS

// get alll users and their hobbies
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({ include: { hobbies: true } });
  res.send(users);
});

// get a single user and his/her hobbies
app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
    include: { hobbies: true },
  });

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ error: "User not found!" });
  }
});

app.listen(port, () => {
  console.log(`Check: http://localhost:${port}`);
});
