import express, {type Express, type Request, type Response} from "express";
import {prisma} from "./lib/prisma.js";
import {User} from "./generated/prisma/client.js";
import {error} from "node:console";
import {
  fetch3RandomUsers,
  fetchUsers,
  fetchUsersByKeyword,
} from "./lib/users.js";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const keyword = req.body.keyword;
    console.log(keyword);
    if (keyword) {
      const users = await fetchUsersByKeyword(keyword);
      res.send(users);
    } else {
      const users = await fetchUsers();
      res.send(users);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/users/random3", async (req: Request, res: Response) => {
  try {
    const exceptions = req.body.exceptions;
    const users = await fetch3RandomUsers(exceptions);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const userData: User = req.body;
    const newUser = await prisma.user.create({
      data: {
        ...userData,
      },
    });
    res.send(newUser);
  } catch (err) {
    console.error(error);
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
