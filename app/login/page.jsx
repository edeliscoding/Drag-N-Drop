"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import axios from "axios";

const Login = () => {
  // const [data, setData] = useState({
  //   email: "",
  //   password: "",
  // });
  const [err, setErr] = useState(false);

  const session = useSession();
  console.log(session);
  const router = useRouter();

  // TODO: ENABLE SESSION BELOW
  if (session.status === "loading") {
    return <p>Loading</p>;
  }
  if (session.status === "authenticated") {
    router?.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { email, password } = data;
    const email = e.target[0].value;
    console.log(email);
    const password = e.target[1].value;

    signIn("credentials", { email, password }).then(() =>
      alert("User has been logged in")
    );
    // const res = await axios.post("/api/auth/login", data);
    // console.log(res);
  };
  return (
    // <div className="mt-30 bg-gray-500 flex flex-col min-h-screen items-center justify-center">
    //   <form onSubmit={handleSubmit}>
    //     <label>Email</label>
    //     <input
    //       type="email"
    //       onChange={(e) => setData({ ...data, email: e.target.value })}
    //       value={data.email}
    //     />
    //     <label>Password</label>
    //     <input
    //       type="password"
    //       onChange={(e) => setData({ ...data, password: e.target.value })}
    //       value={data.password}
    //     />
    //     <button type="submit">SUbmit</button>
    //   </form>
    // </div>

    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            height="20"
            width="20"
          />
          Edel
        </Link> */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-gray-800 bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              {err && "Something Went Wrong"}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Dont have an Account?
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register here
                </Link>
              </p>
            </form>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800">
                or
              </span>
            </div>
            <button
              onClick={() => signIn("google")}
              type="submit"
              className="w-full text-gray-800 bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </section>

    // <div className={styles.container}>
    //   <h1 className={styles.title}></h1>
    //   <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

    //   <form onSubmit={handleSubmit} className={styles.form}>
    //     <input
    //       type="text"
    //       placeholder="Email"
    //       required
    //       className={styles.input}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       required
    //       className={styles.input}
    //     />
    //     <button className={styles.button}>Login</button>
    //   </form>
    //   <button
    //     onClick={() => {
    //       signIn("google");
    //     }}
    //     className={styles.button + " " + styles.google}
    //   >
    //     Login with Google
    //   </button>
    //   <span className={styles.or}>- OR -</span>
    //   <Link className={styles.link} href="/dashboard/register">
    //     Create new account
    //   </Link>
    //   {/* <button
    //   onClick={() => {
    //     signIn("github");
    //   }}
    //   className={styles.button + " " + styles.github}
    // >
    //   Login with Github
    // </button> */}
    // </div>
  );
};

export default Login;
