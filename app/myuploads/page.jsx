import Image from "next/image";
import { NextResponse } from "next/server";
import Table from "../components/Table";
// import { authOptions } from "../api/auth/[...nextauth]";
// import { getServerSession } from "next-auth/next";

// async function getImages() {
//   const response = await fetch(`${process.env.CLOUDINARY_SERVER}/api/upload`);
//   // const json = await response.json();
//   // return json;
//   return response.json();
// }

async function getImages() {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/edel-upload/resources/image`,
    {
      headers: {
        cache: "no-store",
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ":" +
            process.env.CLOUDINARY_API_SECRET
        ).toString("base64")}`,
      },
    }
  );
  // .then((r) => r.json());
  return response.json();
}
export default async function MyUploads() {
  const responseData = await getImages();
  const { resources } = responseData;
  // console.log(resData);
  // console.log(repo);
  // console.log("from myuploads page", imagesApi);
  // async function getImages() {
  //   const response = await fetch(`/api/upload`);
  //   // const json = await response.json();
  //   // return json;
  //   return response.json();
  // }

  // const { data } = await getImages();

  // const session = await getServerSession(authOptions);
  // // if (session.status === "loading") {
  // //   return <p>Loading...</p>;
  // // }
  // // if (session.status === "unauthenticated") {
  // //   router?.push("/login");
  // // }
  // if (!session) {
  //   router?.push("/login");
  // }
  // console.log(session);
  // console.log(data);
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="mt-5 text-bold text-lg text-center uppercase">
        My Files Table
      </h1>
      {/* {resources.map((file) => {
        return <p>{file.asset_id}</p>;
      })} */}
      {/* {data.map((d) => {
        console.log(d);
      })} */}
      {/* <div className="grid lg:grid-cols-3">
        {data.map((f) => {
          return (
            <div>
              <p>{f.title}</p>
              <img src={f.image} />
            </div>
          );
        })}
      </div> */}
      <Table className="mt-10" data={resources} />
      {/* {responseData.map((data) => {
        return <p>{data.asset_id}</p>;
      })} */}
    </div>
  );
}
