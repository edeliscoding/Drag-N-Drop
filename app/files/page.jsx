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
            const { image_url } = item;
            const images = image_url.map((img) => img);
            return (
              <Link href={`files/${item._id}`} key={item._id}>
                {images.map((url, index) => (
                  <img className="p-2 object-cover" src={url} key={url} />
                ))}
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
