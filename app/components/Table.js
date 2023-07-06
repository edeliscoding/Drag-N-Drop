// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const Table = ({ data }) => {
//   // console.log(props);
//   return (
//     <table className="mt-20 table-auto border-separate mb-2 w-full">
//       <thead>
//         <tr>
//           <th className="text-left">Id</th>
//           <th className="text-left">Title</th>
//           <th className="text-left">File</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index} className="odd:bg-gray-200 mb-2">
//             <td className="">{item.asset_id}</td>
//             <td className="text-left">{item.public_id}</td>
//             <td className="text-left">
//               <a
//                 href={item.secure_url}
//                 className="font-normal text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
//               >
//                 {`${item.public_id}.${item.format}`}
//               </a>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;
