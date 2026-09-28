import {User} from "../generated/prisma/client.js";
import {prisma} from "./prisma.js";

export async function fetchUsers() {
  const users = await prisma.user.findMany({
    include: {characterCard: true},
    omit: {email: true, password: true},
  });
  return users;
}

export async function fetch3RandomUsers(exception: number) {
  const users = await fetchUsers();
  const self = users.find(users => users.id == exception);
  const filteredUsers = users.filter(user => user != self);
  const shuffled = filteredUsers.sort(() => 0.5 - Math.random());

  // 3. Take the first 3 elements
  return [self, ...shuffled.slice(0, 3)];
}

export async function fetchUsersByKeyword(keyword: string) {
  return await prisma.user.findMany({
    include: {characterCard: true},
    where: {
      OR: [
        {
          name: {
            contains: keyword,
            mode: "insensitive", // Makes the search case-insensitive
          },
        },
        {
          username: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}
