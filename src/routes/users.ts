import {User} from "../generated/prisma/client.js";
import {prisma} from "../lib/prisma.js";
import express, {Router, type Request, type Response} from "express";

import {fetch3RandomUsers, fetchUsers} from "../lib/users.js";

export const userRouter: Router = express.Router();

userRouter.get("/users", async (req: Request, res: Response) => {
  const {id} = req.query;

  try {
    const users = await fetchUsers();
    console.log(id);
    res
      .status(200)
      .send(id ? users.filter(user => user.id === Number(id))[0] : users);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Select 3 random users (other than self), returns the random users, and self

userRouter.post("/users/random3", async (req: Request, res: Response) => {
  try {
    const exception = req.body.exception as number;
    const selfAndRandomUsers = await fetch3RandomUsers(exception);
    res.status(200).send(selfAndRandomUsers);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

userRouter.post("/users/create", async (req: Request, res: Response) => {
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
    res.status(200).send(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
