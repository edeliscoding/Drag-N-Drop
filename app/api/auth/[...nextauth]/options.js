import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import NextAuthOptions from "next-auth";
import connect from "../../../utils/db";
import bcrypt from "bcryptjs";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();
        const user = await User.findOne({ email: credentials.email });
        if (user) {
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            // redirect("/myuploads");
            return user;
          } else {
            throw new Error("Wrong credentials");
          }
        } else {
          throw new Error("user not found");
        }
      },
    }),
  ],
};
