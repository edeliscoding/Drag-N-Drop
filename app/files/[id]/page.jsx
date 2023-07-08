import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getFile(id) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/images/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
}
// console.log(getFiles());
export default async function File({ params }) {
  const data = await getFile(params.id);
  // const { file } = await data;
  console.log("from files", data);
  // console.log(image_url);
  const content = data.file.url.map((img, index) => {
    return <img src={img} className="aspec-ratio object-cover" key={img} />;
  });
  return (
    <div className="max-w-7xl mx-auto">
      <div className="max-w-4xl w-full mx-auto mt-20">
        {/* <Image
          src={data.image_url}
          width="400"
          height="350"
          className="aspect-auto"
        /> */}
        <div className="grid lg:grid-cols-3 gap-3">{content}</div>

        {/* <img
          src={data.image_url}
          width="400"
          height="350"
          className="aspect-auto"
        /> */}
        <div>
          {/* <p>{data.title}</p> */}
          {/* <p>
            Tags:{" "}
            {data.tags.map((tag, index) => {
              return <span key={tag + index}>{tag}</span>;
            })}
          </p> */}
        </div>
      </div>
    </div>
  );
}
