"use client";

import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center text-center sticky top-0 backdrop-blur-xl">
      {/* <Image src={"/logo.png"} alt="logo image" height={30} width={125} /> */}
      <h1 className="text-3xl font-bold">RedditC</h1>
      <ul className="hidden sm:flex gap-10 items-center">
        <li className="hover:font-bold ease-linear duration-150">
          {session ? (
            <button
              onClick={() => signOut()}
              className="hidden sm:block rounded-lg "
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="hidden sm:block rounded-lg "
            >
              Sign In
            </button>
            /*
						<Link href="/signin" className="hidden sm:block rounded-lg ">
							Sign In
						</Link>
						*/
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
