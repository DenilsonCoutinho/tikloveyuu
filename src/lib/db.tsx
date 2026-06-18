import { PrismaClient } from "@prisma/client";

if (process.env.DATABASE_URL?.includes(".mongodb.net/tiklover")) {
  process.env.DATABASE_URL = process.env.DATABASE_URL.replace(".mongodb.net/tiklover", ".mongodb.net/tikLover");
}

if (process.env.DATABASE_URL?.includes(".mongodb.net/?")) {
  process.env.DATABASE_URL = process.env.DATABASE_URL.replace(".mongodb.net/?", ".mongodb.net/tikLover?");
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
