"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  // console.log(router);
  // let current = location.pathname;
  // console.log(current);

  const navLinks = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    // {
    //   id: 2,
    //   name: "My Uploaded Files",
    //   href: "/myuploads",
    // },
    {
      id: 2,
      name: "Gallery",
      href: "/myfiles",
    },
    {
      id: 3,
      name: "My Files",
      href: "/files",
    },
  ];

  const pathname = usePathname();
  // console.log(pathname);

  return (
    <div className="w-full bg-slate-500 p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-white font-bold">Edel Upload File Project</h1>
        </Link>
        <nav className="flex gap-4 items-center">
          {session.status === "authenticated" ? (
            <div className="flex gap-2">
              {navLinks.map((navLink) => {
                // const isActive = pathname.startsWith(navLink.href);
                // console.log(isActive);
                return (
                  <Link
                    key={navLink.id}
                    href={navLink.href}
                    // className={`${
                    //   router.pathname === href
                    //     ? "bg-orange-500 text-white"
                    //     : "bg-white text-gray-800"
                    // }`}
                    className={`${
                      router.pathname === navLink.href
                    } ? bg-slate-800 text-white py-2 px-3 rounded-full : "bg-white text-gray-800"`}
                  >
                    {navLink.name}
                  </Link>
                );
              })}{" "}
            </div>
          ) : (
            <div></div>
          )}

          {/* <Link className="active" href="/">
            Home
          </Link>
          <Link
            className="text-white bg-slate-800 px-4 py-2 rounded-full active"
            href="/myfiles"
          >
            My Files
          </Link> */}
          {session.status === "authenticated" && (
            <button onClick={signOut} className="text-white">
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
