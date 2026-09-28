import express, {type Express, type Request, type Response} from "express";
import {prisma} from "./lib/prisma.js";
import {User} from "./generated/prisma/client.js";

import {fetch3RandomUsers, fetchUsers} from "./lib/users.js";
import listEndpoints from "express-list-endpoints";

import {userRouter} from "./routes/users.js";
import {getRoutes} from "./lib/misc.js";

const app: Express = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());

app.use(userRouter);

app.get("/", (req: Request, res: Response) => {
  const stack = (app as any).router?.stack ?? (app as any)._router?.stack;
  const endpoints = getRoutes(stack);
  const prettyRoutes = endpoints.map(endpoint => {
    console.log(endpoint.path);
    return endpoint.methods + " " + endpoint.path;
  });
  res.send(prettyRoutes);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
