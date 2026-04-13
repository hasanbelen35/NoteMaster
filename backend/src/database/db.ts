import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function connectDB(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("db connection successful");
  } catch (error) {
    console.error("db connection error", error);
    process.exit(1);
  }
}

export default prisma;