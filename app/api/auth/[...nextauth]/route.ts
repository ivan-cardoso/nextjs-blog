import NextAuth, { NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!process.env.ADMIN_EMAIL) {
        console.error("ADMIN_EMAIL environment variable is not set.");
        return false;
      }
      let userEmail: string | undefined | null = user.email;
      if (!userEmail && profile && "email" in profile && profile.email) {
        userEmail = profile.email;
      }
      if (userEmail) {
        if (userEmail.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()) {
          console.log(`Admin user ${userEmail} attempting to sign in.`);
          return true;
        } else {
          console.log(`Access denied for user ${userEmail}. Not an admin.`);
          return false;
        }
      } else {
        console.warn("Could not determine user email for sign-in check.");
        return false;
      }
    },
    async session({ session, token }) {
      if (token?.email && process.env.ADMIN_EMAIL) {
        // @ts-ignore
        session.user.isAdmin =
          token.email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase();
      }
      if (token?.sub) {
        // @ts-ignore
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        // @ts-ignore
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
