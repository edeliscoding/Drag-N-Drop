// import User from "../../../models/User";
import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import connect from "../../../utils/db";
// import bcrypt from "bcryptjs";
// import { redirect } from "next/navigation";
import { options } from "./options";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     Credentials({
//       id: "credentials",
//       name: "Credentials",
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
//           // try {
//           //   const user = await User.findOne({ email: credentials.email });
//           //   if (user) {
//           //     //check password
//           //     const isPasswordCorrect = await bcrypt.compare(
//           //       credentials.password,
//           //       user.password
//           //     );
//           //     if (isPasswordCorrect) {
//           //       redirect("/");
//           //       return user;
//           //     } else {
//           //       throw new Error("Wrong credentials");
//           //     }
//           //   } else {
//           //     throw new Error("user not found");
//           //   }
//           // } catch (error) {
//           //   throw new Error(error);
//           // }
//         } else {
//           throw new Error("user not found");
//         }
//       },
//     }),
//   ],
//   pages: {
//     error: "/login",
//   },
// });

// export { handler as GET, handler as POST };

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// };
// export default NextAuth(authOptions);

// export { handler as GET, handler as POST };

// export const options = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     Credentials({
//       id: "credentials",
//       name: "Credentials",
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
//           // try {
//           //   const user = await User.findOne({ email: credentials.email });
//           //   if (user) {
//           //     //check password
//           //     const isPasswordCorrect = await bcrypt.compare(
//           //       credentials.password,
//           //       user.password
//           //     );
//           //     if (isPasswordCorrect) {
//           //       redirect("/");
//           //       return user;
//           //     } else {
//           //       throw new Error("Wrong credentials");
//           //     }
//           //   } else {
//           //     throw new Error("user not found");
//           //   }
//           // } catch (error) {
//           //   throw new Error(error);
//           // }
//         } else {
//           throw new Error("user not found");
//         }
//       },
//     }),
//   ],
// };

const handler = NextAuth(options);

export { handler as GET, handler as POST };
