// const createItem = async (item) => {
//   const response = await fetch(`/api/images`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(item),
//   });

//   const data = await response.json();
//   return data;
// };

// export { createItem };
import { useMutation } from "@tanstack/react-query";
import { revalidateTag } from "next/cache";
import { ToastContainer, toast } from "react-toastify";
const handleClear = () => {
  // setImages([]);
};

const notify = (callback) =>
  toast.success(
    "🦄 Your file has been submitted!",
    {
      position: "top-center",
      autoClose: 3000,
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

const useCreateImageMutation = () => {
  return useMutation(
    async ({ publicId, urls, resource_type, format, currentUser }) => {
      const response = await fetch("/api/images", {
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
        }),
      });

      const data = await response.json();
      return data;
    },
    {
      onSuccess: () => {
        notify(handleClear);
        revalidateTag("myuploads");
      },
    }
  );
};

export { useCreateImageMutation };
