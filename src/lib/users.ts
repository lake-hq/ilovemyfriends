import {User} from "../generated/prisma/client.js";
import {prisma} from "./prisma.js";

export async function fetchUsers() {
  const users = await prisma.user.findMany({
    include: {characterCard: true},
  });
  console.log(users);
  return users;
}

export async function fetch3RandomUsers(exception: string) {
  const users = await fetchUsers();
  const filteredUsers = users.filter(user => user.id !== exception);

  console.log(users);
  const shuffled = filteredUsers.sort(() => 0.5 - Math.random());

  // 3. Take the first 3 elements
  return shuffled.slice(0, 3);
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
