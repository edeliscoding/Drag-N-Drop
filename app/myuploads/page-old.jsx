// "use client";

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { use } from "react";
// import useSWR from "swr";

// const fetchMap = new Map();
// function queryClient(name, query) {
//   if (!fetchMap.has(name)) {
//     fetchMap.set(name, query);
//   }
//   return fetchMap.get(name);
// }
// const getFiles = async () => {
//   const res = await fetch("/api/upload");
//   return res.json();
//   // return data;
// };

// const getFiles = async () => {
//   const res = await fetch("/api/upload");
//   return res.json();
//   // return data;
// };

// const dataPromise = getFiles();

const MyUploads = async () => {
  const [imagesArray, setImagesArray] = useState([]);

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["repoData"],
  //   queryFn: () => fetch("api/upload").then((res) => res.json()),
  // });

  // if (isLoading) return "Loading...";
  // if (error) return "an erro has occured";
  // console.log("this is frontend data", data);

  const data = use(
    queryClient("img", () => fetch("/api/upload").then((res) => res.json()))
  );
  // const images = use(dataPromise);
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, error, isLoading } = useSWR("/api/upload", fetcher);

  // console.log(data);
  // const getFiles = async () => {
  //   const res = await fetch("/api/upload");
  //   return res.json();
  //   // return data;
  // };

  // useEffect(() => {
  //   const getMyFiles = async () => {
  //     const res = await fetch("/api/upload");
  //     const data = await res.json();
  //     setImagesArray(data);
  //   };
  //   getMyFiles();
  // }, []);

  // console.log(imagesArray);
  return (
    // {myImages.map((img) => {
    //   return <Image src={img.image} height={img.height} width={img.width} />
    // })}

    // <div className="max-7xl mx-auto mt-40">
    //   <h2> My Images </h2>
    <div className="grid lg:grid-cols-3">
      {/* <h1>
        {data.map((img) => {
          return img.title;
        })}
      </h1> */}
      {/* {data.map((img) => {
        const { id, title, image, width, height } = img;
        return (
          <Image
            src={image}
            width={width}
            height={height}
            key={id}
            alt={title}
          />
        );
      })} */}
      Hello from MY UPLOADS
    </div>
    // </div>
  );
};

export default MyUploads;
