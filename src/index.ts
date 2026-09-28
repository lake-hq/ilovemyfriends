import express, {type Express, type Request, type Response} from "express";
import multer from "multer";
import {prisma} from "./lib/prisma.js";
import {User} from "./generated/prisma/client.js";
import {error} from "node:console";
import expressListEndpoints from "express-list-endpoints";

import {
  fetch3RandomUsers,
  fetchUsers,
  fetchUsersByKeyword,
} from "./lib/users.js";
import {getRoutes} from "./lib/misc.js";

const app: Express = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());

app.get("/users", async (req: Request, res: Response) => {
  const {id} = req.query;

  try {
    const users = await fetchUsers();
    console.log(id);
    res.send(id ? users.filter(user => user.id === Number(id))[0] : users);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.post("/createUser", async (req: Request, res: Response) => {
  try {
    const userData: User = req.body;
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        characterCard: {
          create: {
            mbti: "None",
            likes: "None",
            dislikes: "None",
            sliders: {},
          },
        },
      },
    });
    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/users/random3", async (req: Request, res: Response) => {
  try {
    const exception = req.body.exception as number;
    const users = await fetch3RandomUsers(exception);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/", (req: Request, res: Response) => {
  const routes = getRoutes(app);
  res.status(200).json(routes);
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
