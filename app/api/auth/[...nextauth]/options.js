// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import NextAuthOptions from "next-auth";
// import connect from "../../../utils/db";
// import bcrypt from "bcryptjs";

// export const options = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     CredentialsProvider({
//       id: "credentials",
//       name: "credentials",
//       credentials: {
//         email: { label: "email", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//         username: {
//           label: "Username",
//           type: "text",
//           placeholder: "john Smith",
//         },
//       },
//       async authorize(credentials) {
//         await connect();
//         const user = await User.findOne({ email: credentials.email });

//         if (user) {
//           const isPasswordCorrect = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );
//           if (isPasswordCorrect) {
//             // redirect("/myuploads");
//             return user;
//           } else {
//             throw new Error("Wrong credentials");
//           }
//         } else {
//           throw new Error("user not found");
//         }
//       },
//     }),
//   ],
//   secret: process.env.SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   debug: process.env.NODE_ENV === "development",
//   pages: {
//     error: "/login",
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions)
// export {handler as GET, handler as POST}
