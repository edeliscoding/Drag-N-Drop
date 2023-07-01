"use client";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useRef } from "react";

export default function MyPage() {
  const containerRef = useRef(null);
  useEffect(() => {
    cloudinary
      .galleryWidget({
        container: "#my-gallery",
        cloudName: "edel-upload",
        aspectRatio: "16:9",
        mediaAssets: [
          { tag: "animal" },
          { tag: "design" },
          { tag: "wow" },
          { tag: "videos", mediaType: "video" },
        ],
      })
      .render();
  }, []);
  return (
    <div ref={containerRef} className="max-w-7xl mx-auto mt-10" id="my-gallery">
      <Script src="https://product-gallery.cloudinary.com/all.js" />
      Gallery Page
    </div>
  );
}
