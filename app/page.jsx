"use client";

// import { Cloudinary } from "@cloudinary/url-gen";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextResponse } from "next/server";
import axiosInstance from "./api/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const revalidate = 15;

export default function Home() {
  const [images, setImages] = useState([]);
  const session = useSession();
  const router = useRouter();
  console.log(session);
  const currentUser = session?.data?.user.name;
  const notify = (callback) =>
    toast.success(
      "🦄 Your file has been submitted!",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      },
      setTimeout(() => {
        callback();
      }, 3000)
    );
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    console.log("acceptedFies", acceptedFiles);
    // acceptedFiles.forEach((file) => {
    //   // convert image to base64 string
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setImages((prevState) => [...prevState, reader.result]);
    //   };
    //   reader.readAsDataURL(file);
    //   setImages((prevState) => [...prevState, file]);
    // });
    // console.log(acceptedFiles);
    // console.log(rejectedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*, .doc, .pdf, .docx",
  });

  const handleUpload = async () => {
    // let promises = [];
    // const prom = await Promise.all(
    //   promises.map(async (promise) => {
    //     return promise;
    //   })
    // );

    // const urls = promises.map((promise) => promise.data?.url); //this is correct
    // let copy = [...promises];
    // images.forEach(async (image) => {
    //   promises.push(
    //     await axios.post(`https://api.cloudinary.com/v1_1/edel-upload/upload`, {
    //       file: image,
    //       // overwrite: true,
    //       upload_preset: "edel-upload",
    //     })
    //   );
    // });
    // await Promise.all(promises).then(function (promise) {
    //   console.log(".then promise", promise);
    // });
    // const call = async () => {
    //   await Promise.all(
    //     promises.map(async (r) => {
    //       console.log(r);
    //     })
    //   );
    // };
    // call();

    // promises.forEach((promise, index) => {
    //   const data = promise.data;
    //   console.log("From Loop", data);
    // });
    // await fetch("http://localhost:3000/api/images", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     image_url: url,
    //     // username: session?.data?.user.name,
    //     username: currentUser,
    //   }),
    // });
    //** single image upload - it works**/
    // const image = images[0];
    // const response = await axios.post(
    //   `https://api.cloudinary.com/v1_1/edel-upload/upload`,
    //   {
    //     file: image,
    //     upload_preset: "edel-upload",
    //   }
    // );
    // return response;
    //** end of single image upload */

    // notify(handleClear);
    // res.send(response);
    // return promises;

    // });
    // console.log(urlArray);
    // const dbresponse = await fetch("http://localhost:3000/api/images", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     image_url: imageUrl,
    //     // username: session?.data?.user.name,
    //     username: currentUser,
    //   }),
    // });

    // CHAT GPT CODE BELOW//
    let promises = [];

    images.forEach((image) => {
      promises.push(
        axios.post(`https://api.cloudinary.com/v1_1/edel-upload/upload`, {
          file: image,
          upload_preset: "edel-upload",
          // transformation: {
          //   // flags: `attachment:${image}`,
          //   // fetch_format: "auto",
          // },
          // transformation: {
          //   flags: `attachment:${image}`,
          //   fetch_format: "auto",
          // },

          // flags: attachment,
        })
      );
    });

    Promise.all(promises)
      .then((responses) => {
        // Access the 'url' property inside each response
        const urls = responses.map((response) => response.data.url);

        const resource_type = responses.map(
          (response) => response.data.resource_type
        );
        // const stringify_resource_type = JSON.stringify(resource_type);
        const format = responses.map((response) => response.data.format);
        // const isPdf = format.find(el => el.)

        const publicId = responses.map((response) => response.data.public_id);
        // const stringify_format = JSON.stringify(format);
        console.log("from promises.all", responses);
        // const { resource_type, format } = responses.data;
        //data.resource_type = image,image,raw=worddoc data.format = jpeg,pdf, data.public_id
        // Do something with the 'urls' array
        console.log("from promise", resource_type, format);
        fetch("/api/images", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            file: {
              publicId: publicId,
              url: urls,
              resource_type: resource_type,
              format: format,
            },
            username: currentUser,
            // image_urlresource_type: stringify_resource_type,
            // format: stringify_format,
          }),
        });
        notify(handleClear);
        console.log(urls);
      })
      .catch((error) => {
        // Handle any errors that occurred during the requests
        console.error(error);
      });
  };
  const handleClear = () => {
    setImages([]);
  };
  useEffect(() => {
    console.log(images);
  }, [images]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router?.push("/login");
  }

  if (session.status === "authenticated") {
    return (
      <div className="App">
        <div
          className="dropzone bg-gray-100 h-[300px] text-center max-w-7xl mx-auto mt-20 border-8 border-dotted pt-20 font-500"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive
            ? "Drag Active"
            : "You can drop your files here or click here"}
        </div>
        <div>
          {images.length > 0 && (
            <div className="flex items-center justify-center">
              {images.map((image, index) => {
                return (
                  <img
                    className="m-4"
                    src={image}
                    key={index}
                    height="100"
                    width="100"
                  />
                );
              })}
            </div>
          )}
        </div>
        {images.length > 0 && (
          <div className="flex item-center justify-center">
            <button
              className="text-center px-3 py-2 bg-slate-700 text-white"
              onClick={handleUpload}
            >
              Upload Images
            </button>
            <button
              className="text-center px-2 py-1 bg-gray-400 text-white ml-2 block"
              onClick={handleClear}
            >
              Clear Upload
            </button>
            <ToastContainer />
          </div>
        )}
      </div>
    );
  }

  // return (
  //   <div className="App">
  //     <div
  //       className="dropzone bg-gray-100 h-[300px] text-center max-w-7xl mx-auto mt-20 border-8 border-dotted pt-20 font-500"
  //       {...getRootProps()}
  //     >
  //       <input {...getInputProps()} />
  //       {isDragActive
  //         ? "Drag Active"
  //         : "You can drop your files here or click here"}
  //     </div>
  //     <div>
  //       {images.length > 0 && (
  //         <div className="flex items-center justify-center">
  //           {images.map((image, index) => {
  //             return (
  //               <img
  //                 className="m-4"
  //                 src={image}
  //                 key={index}
  //                 height="100"
  //                 width="100"
  //               />
  //             );
  //           })}
  //         </div>
  //       )}
  //     </div>
  //     {images.length > 0 && (
  //       <div className="flex item-center justify-center">
  //         <button
  //           className="text-center px-3 py-2 bg-slate-700 text-white"
  //           onClick={handleUpload}
  //         >
  //           Upload Images
  //         </button>
  //         <button
  //           className="text-center px-2 py-1 bg-gray-400 text-white ml-2 block"
  //           onClick={handleClear}
  //         >
  //           Clear Upload
  //         </button>
  //         <ToastContainer />
  //       </div>
  //     )}
  //   </div>
  // );
}
