import Image from "next/image";
import Table from "../components/Table";
// import { authOptions } from "../api/auth/[...nextauth]";
// import { getServerSession } from "next-auth/next";
import Router from "next/navigation";

async function getImages() {
  const response = await fetch(`${process.env.CLOUDINARY_SERVER}/api/upload`);
  // const json = await response.json();
  // return json;
  return response.json();
}

export default async function MyUploads() {
  const { data } = await getImages();

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
      <Table className="mt-10" data={data} />
    </div>
  );
}
