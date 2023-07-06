import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Image from "../../../models/Image";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

// export const GET = async (request) => {
//   //fetch
//   try {
//     await connect();
//     const images = await Image.find();
//     return new NextResponse(JSON.stringify(images), { status: 200 });
//   } catch (error) {
//     return new NextResponse("Database error", { status: 500 });
//   }
// };

export const POST = async (request) => {
  const { name, email, password } = await request.json();
  await connect();
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return new NextResponse("User has been created", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
