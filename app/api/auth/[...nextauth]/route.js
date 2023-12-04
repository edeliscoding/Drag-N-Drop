// import NextAuth from "next-auth";

// import { options } from "./options";

// const handler = NextAuth(options);

// export { handler as GET, handler as POST };

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuthOptions from "next-auth";
import connect from "../../../utils/db";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next"; // this is new
import User from "../../../models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        // username: {
        //   label: "Username",
        //   type: "text",
        //   placeholder: "john Smith",
        // },
      },
      async authorize(credentials) {
        // const user = { id: 1, name: "brix", email: "brix@gmail.com" };
        // return user;
        await connect();
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        // await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("no user found");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect credentials");
          }
          if (isPasswordCorrect) {
            return user;
            console.log("from next-auth route", user);
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    error: "/login",
    // signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
