"use client";

import { Cloudinary } from "@cloudinary/url-gen";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextResponse } from "next/server";
import axiosInstance from "./api/utils";

export default function Home() {
  const [images, setImages] = useState([]);

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
      }, 2000)
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
    let promises = [];
    images.forEach(async (image) => {
      promises.push(
        await axios.post("https://api.cloudinary.com/v1_1/edel-upload/upload", {
          file: image,
          // overwrite: true,

          upload_preset: "edel-upload",
        })
      );
    });
    const response = await Promise.all(promises);
    notify(handleClear);

    return response;
  };

  const handleClear = () => {
    setImages([]);
  };
  useEffect(() => {
    console.log(images);
  }, [images]);
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
