import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-slate-500 p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-white font-bold">Edel Upload File Project</h1>
        </Link>
        <nav className="flex gap-4 items-center text-white">
          <Link className="active" href="/">
            Home
          </Link>
          <Link
            className="text-white bg-slate-800 px-4 py-2 rounded-full"
            href="/myfiles"
          >
            My Files
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
