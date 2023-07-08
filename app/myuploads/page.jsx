import React from "react";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Image from "next/image";
import Link from "next/link";

async function getData(currentUser) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/images?username=${currentUser}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
}

export default async function MyUploads() {
  const session = await getServerSession(options);
  const currentUser = session?.user.name;
  //   console.log(session);
  console.log("from server component", session);
  const data = await getData(currentUser);
  console.log("myuploads page", data);
  // const resData = data.map((urls) => urls);
  // console.log("resData", resData);
  // const urls = resData.map((res) => res.url);
  // console.log("form urls", urls);
  // const resource_type = resData.map((res) => res.resource_type);
  // const format = resData.map((res) => res.format);

  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <table className="mt-20 table-auto border-separate mb-2 w-full p-2">
        <thead>
          <tr>
            <th className="text-left">File Link</th>
            <th className="text-left">File Type</th>
            {/* <th className="text-left">File</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((singlefile, index) => {
            const urls = singlefile.file.url.map((f) => f);
            const nameOfFile = singlefile.file.publicId.map((name) => name);
            const spaceUrls = urls.join(" ");
            const fileType = singlefile.file.format.map((f) => f);

            return (
              <tr key={singlefile._id} className="odd:bg-gray-200 mb-2">
                <td>
                  {urls.map((item) => {
                    return (
                      <div className="flex flex-col" key={item}>
                        <a
                          href={item}
                          className="font-normal text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          download
                        >
                          {nameOfFile}
                        </a>
                      </div>
                    );
                  })}
                </td>
                <td>
                  {fileType.map((item) => {
                    return (
                      <div className="flex flex-col" key={item}>
                        {item}
                      </div>
                    );
                  })}
                </td>
                {/* <td>{urls}</td> */}
              </tr>
            );
          })}
          {/* {data.map((item, index) => (
            <tr key={index} className="odd:bg-gray-200 mb-2">
              <td className="">{item.image_url.url[0]}</td>
              {/* <td className="text-left">{item.resource_type[0]}</td> */}
          {/* <td className="text-left">
                <a
                  href={item.image_url.url[0]}
                  className="font-normal text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                >
                  {item.image_url.url[0]}
                </a>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
