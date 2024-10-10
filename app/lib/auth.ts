import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Coach from "@/models/coaches";
import {connectToDatabase} from "./mongodb";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {label: "Email", type: "text"},
        password: {label: "Password", type: "password"},
      },
      // Authorize function that takes the coach profile from google, and then checks the database if the user
      // exists in the database,
      // This means it has 2 levels of authorization, login to google,
      // the google account is then used to register a db account
      async authorize(credentials) {
        await connectToDatabase();
        const coach = await Coach.findOne({
          email: credentials.email,
        }).select("+password");

        if (!coach) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          coach.password,
        );
        console.log(coach);
        return coach;
      },
    }),
  ],
  pages: {
    login: "/auth/login",
  },
  callbacks: {
    // Add user access token and user id to the JWT token
    async jwt({token, user, account}) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
        console.log(user);
      }
      return token;
    },
    // Add token and token id to the session token
    async session({session, token}) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
    updateAge: 20 * 60,
  },
  jwt: {
    maxAge: 30 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
};
