import "dotenv/config";
import {PrismaClient} from "../generated/prisma/client.js";
import {PrismaPg} from "@prisma/adapter-pg";
import {Pool} from "pg";

// 1. Create a pg Pool using your pooled connection string (Port 6543)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Wrap the pool in Prisma's adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the Prisma Client
export const prisma = new PrismaClient({adapter});
