import express, {type Express, type Request, type Response} from "express";
import {db} from "./prisma/db.js";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await db.orm.public.User.where({}).all();
  res.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
