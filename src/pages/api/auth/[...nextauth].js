import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { randomBetweenRange } from "@/helpers/random";

import _ from "lodash";
import axios from "axios";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const config = {
          headers: {
            "X-Master-Key":
              "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
          },
        };

        const db = await axios.get(
          "https://api.jsonbin.io/v3/b/64471c7e9d312622a351809e",
          config
        );

        const dbUser = _.find(
          db.data.record.users,
          (user) =>
            user.username === credentials.username &&
            user.password === credentials.password
        );

        const currentData = db.data.record;

        dbUser.balance = randomBetweenRange(250000, 800000);

        const thisIndex = _.findIndex(
          currentData.users,
          (user) =>
            user.username === credentials.username &&
            user.password === credentials.password
        );

        currentData.users.splice(thisIndex, 1, dbUser);

        await axios({
          method: "put",
          url: "https://api.jsonbin.io/v3/b/64471c7e9d312622a351809e ",
          headers: {
            "X-Master-Key":
              "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
          },
          data: currentData,
        });

        console.log(dbUser);
        if (dbUser) return dbUser;

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.balance = user.balance;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.username = token.username;
        session.user.id = token.id;
        session.user.balance = token.balance;
      }

      return session;
    },
  },
});
