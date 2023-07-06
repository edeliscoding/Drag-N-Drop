// import Image from "next/image";
// import { NextResponse } from "next/server";
// import Table from "../components/Table";

// export const revalidate = 1;

// async function getImages() {
//   const response = await fetch(
//     `https://api.cloudinary.com/v1_1/edel-upload/resources/image`,
//     {
//       headers: {
//         cache: "no-store",
//         Authorization: `Basic ${Buffer.from(
//           process.env.CLOUDINARY_API_KEY +
//             ":" +
//             process.env.CLOUDINARY_API_SECRET
//         ).toString("base64")}`,
//       },
//     }
//   );
//   // .then((r) => r.json());
//   return response.json();
// }
// export default async function MyUploads() {
//   const responseData = await getImages();
//   const { resources } = responseData;

//   return (
//     <div className="max-w-7xl mx-auto">
//       <h1 className="mt-5 text-bold text-lg text-center uppercase">
//         My Files Table
//       </h1>

//       <Table className="mt-10" data={resources} />
//     </div>
//   );
// }
