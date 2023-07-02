import { NextResponse } from "next/server";

export async function GET() {
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`,
    { cache: "no-store" },
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ":" +
            process.env.CLOUDINARY_API_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((r) => r.json());

  // const { resources } = results;
  // console.log(resources);
  // const imagesApi = resources.map((resource) => {
  //   const { width, height } = resource;
  //   return {
  //     id: resource.asset_id,
  //     title: resource.public_id,
  //     secure_image: resource.url,
  //     width,
  //     height,
  //   };
  // });
  // console.log(resources);
  return NextResponse.json(results, { status: 200 });
}

// const {resources} = results;
// const images = resources.map(resource => {
//     const {width, height} = resource;
//     return {
//         id: resource.asset_id,
//         title: resource_public_id,
//         image: resource.secure_url,
//         width,
//         height
//     }
// })
