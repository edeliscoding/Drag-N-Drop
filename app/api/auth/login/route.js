import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import User from "../../../models/User";
export async function POST(request) {
  const { email, password } = await request.json();

  // const user = { id: 1, name: "brix", email: "brix@gmail.com" };
  // return user;
  await connect();
  if (!email || !password) {
    throw new Error("Please enter an email and password");
  }

  // await connect();
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("no user found");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Incorrect credentials");
    }
    if (isPasswordCorrect) {
      // return user;
      return NextResponse.json(
        { message: "you have successfuly logged in" },
        { status: 200 }
      );
    }
  } catch (error) {
    throw new Error(error);
  }
}
