"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

export default function Files() {
  const session = useSession();
  const router = useRouter();
  const currentUser = session?.data?.user.name;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // async function getFiles(currentUser) {
  //   const res = await fetch(
  //     `http://localhost:3000/api/images?username=${currentUser}`,
  //     {
  //       cache: "no-store",
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("failed to fetch data");
  //   }
  //   return res.json();
  // }
  const { data, error, isLoading } = useSWR(
    `/api/images?username=${currentUser}`,
    fetcher
  );
  // const data = await getFiles(currentUser);
  console.log("data", data);
  console.log(currentUser);
  // const { image_url } = data;
  // const content = image_url.map((img) => {
  //   return <img src={img} />;
  // });
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router?.push("/login");
  }

  if (session.status === "authenticated") {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="grid max-w-6xl w-full grid-cols-4 gap-3 mt-20">
          {data?.map((item) => {
            const { url } = item.file;

            const { format } = item.file;
            console.log("from url", url);
            console.log("from file", format);
            // const nonImages = format.includes(
            //   "raw",
            //   "pdf",
            //   "doc",
            //   "tiff",
            //   "doc"
            // );
            const images = url.map((img) => img);
            // const content = nonImages && <img src="/images/PDF.png" />;
            return (
              <Link href={`files/${item._id}`} key={item._id}>
                {images.map((url, index) => {
                  // const content = nonImages ? (
                  //   <img src="/images/PDF.png" />
                  // ) : (
                  //   <img className="p-2 object-cover" src={url} key={url} />
                  // );
                  // const imageformat = (
                  //   <img className="p-2 object-cover" src={url} key={url} />
                  // );
                  // const nonImageformat = <img src="/images/PDF.png" />;
                  // const renderFile = nonImages ? nonImageFormat : imageformat;
                  return (
                    // <img className="p-2 object-cover" src={url} key={url} />
                    // { content }
                    // <img
                    //   className="p-2 object-cover"
                    //   src={`${nonImages}` ? "/images/PDF.png" : url}
                    //   key={url}
                    // />
                    <img className="p-2 object-cover" src={url} key={url} />
                  );
                })}
              </Link>
            );
          })}
          {/* {data.image_url.map((image) => {
            return <img src={image} />;
          })} */}
        </div>
      </div>
    );
  }
}
