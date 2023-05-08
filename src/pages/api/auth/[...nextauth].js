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
        const user = {};

        try {
          const api = await axios.post(
            "https://apiaviator.appsdaroi.com.br/api/login",
            {
              login: credentials.username,
              password: credentials.password,
            }
          );

          user.id = api.data.user.id;
          user.token = api.data.token;
          user.username = api.data.user.login;
          user.balance = randomBetweenRange(250000, 800000);

          return user;
        } catch (err) {
          console.log(err);
          return;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.balance = user.balance;
        token.token = user.token;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.username = token.username;
        session.user.id = token.id;
        session.user.balance = token.balance;
        session.user.token = token.token;
      }

      return session;
    },
  },
});
