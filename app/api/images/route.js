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
  // const { image_url, username, resource_type, format } = await request.json();
  const { file, username } = await request.json();
  // console.log("from API POST", image_url, username, resource_type, format);
  console.log("from API POST", file, username);
  await connect();
  // publicId: publicId,
  // url: urls,
  // resource_type: resource_type,
  // format: format,
  const { public_id, url, resource_type, format } = file;
  //  file: {
  //   publicId: [String],
  //   url: [String],
  //   resource_type: [String],
  //   format: [String],
  // },
  // const newImages = new Image({
  //   file: { public_id, url, resource_type, format },
  // });
  // const fileDocument = {
  //   publicId: public_id,
  //   url: url,
  //   resource_type: resource_type,
  //   format: format,
  // };
  const newImages = new Image({ file, username });
  // console.log(newImages);
  try {
    await newImages.save();
    // const insert = await Image.insertOne(fileDocument);
    // await insert.save();
    return new NextResponse("image Upload successful", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
