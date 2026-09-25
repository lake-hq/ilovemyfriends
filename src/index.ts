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
  res.send("Abraham Kha gay");
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await fetchUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
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

app.get("/users/:keyword", async (req: Request, res: Response) => {
  try {
    const keyword = req.params.keyword as string;
    const users = await fetchUsersByKeyword(keyword);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/users/random3", async (req: Request, res: Response) => {
  const exceptions = (req.body.exceptions as string[]) || [];
  try {
    const users = await fetch3RandomUsers(exceptions);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
