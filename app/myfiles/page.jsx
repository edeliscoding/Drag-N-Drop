"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function MyPage() {
  const containerRef = useRef(null);

  const session = useSession();
  const router = useRouter();

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
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router?.push("/login");
  }

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto mt-10" id="my-gallery">
      Gallery Page
    </div>
  );

  // return <div>My Files Page</div>;
}
