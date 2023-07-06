import { NextResponse } from "next/server";
import connect from "../../utils/db";
import Image from "../../models/Image";

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  try {
    await connect();
    const images = await Image.find(username && { username });
    return new NextResponse(JSON.stringify(images), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};

// export const GET = async (request) => {
//   try {
//     await connect();
//     const images = await Image.find();
//     return new NextResponse(JSON.stringify(images), { status: 200 });
//   } catch (error) {
//     return new NextResponse("Database error", { status: 500 });
//   }
// };

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
  const { image_url, username } = await request.json();
  console.log("from API POST", image_url, username);
  await connect();

  const newImages = new Image({ image_url, username });
  console.log(newImages);
  try {
    await newImages.save();
    return new NextResponse("image Upload successful", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
