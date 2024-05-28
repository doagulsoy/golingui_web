import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env";
import { instance } from "~/utils/axios";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      userName: string;
      token: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  jwt: {
    secret: "secret",
    maxAge: 3000,
  },
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  secret: "secret",
  // Include user.id on session
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return { ...token, ...user };
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.userName = token.firstName as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials");

        const requestBody = {
          query: `
            mutation Mutation($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                code
                message
                success
                token
                user {
                  email
                  firstName
                }
              }
            }
          `,
          variables: {
            email: credentials.email,
            password: credentials.password,
          },
        };
        const res = await instance.post("/graphql", requestBody);
        if (res.data.errors) {
          throw new Error(res.data.errors[0].message);
        }
        return {
          ...res.data.data.login.user,
          token: res.data.data.login.token,
        };
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
