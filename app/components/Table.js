import Image from "next/image";
import Link from "next/link";
import React from "react";

const Table = ({ data }) => {
  return (
    <table className="mt-20 table-auto border-separate mb-2 w-full">
      <thead>
        <tr>
          <th className="text-left">Id</th>
          <th className="text-left">Title</th>
          <th className="text-left">File</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="odd:bg-gray-200 mb-2">
            <td className="">{item.id}</td>
            <td className="text-left">{item.title}</td>
            <td className="text-left">
              <a
                href={item.image}
                className="font-normal text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
              >
                {item.title}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
