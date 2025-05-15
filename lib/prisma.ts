/* import { PrismaClient } from "./generated/prisma"; 


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
 */

// src/lib/prisma.ts (or your chosen path)
import { PrismaClient } from "./generated/prisma";

// Extend the NodeJS global type with the PrismaClient for development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Initialize PrismaClient
// In development, use the global variable to preserve the PrismaClient instance
// across hot reloads. In production, always create a new instance.
export const prisma =
  global.prisma ||
  new PrismaClient({
    // Optional: You can configure logging here
    // log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    log: ["query"],
  });

// If in development, set the global prisma instance.
// This helps prevent creating too many connections during hot reloads.
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
