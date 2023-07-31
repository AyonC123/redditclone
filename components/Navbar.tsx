"use client";

import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center text-center sticky top-0 backdrop-blur-xl">
      {/* <Image src={"/logo.png"} alt="logo image" height={30} width={125} /> */}
      <h1 className="text-3xl font-bold">RedditC</h1>
      <ul className="hidden sm:flex gap-10 items-center">
        <li className="hover:font-bold ease-linear duration-150">
          {session ? (
            <div className="flex justify-evenly gap-10">
              <Button onClick={() => signOut()} className="hidden sm:block">
                Sign Out
              </Button>
              <Image
                src={session.user?.image!}
                alt="Profile Image"
                width={30}
                height={30}
                className="h-10 w-10 rounded-3xl"
              />
            </div>
          ) : (
            /*
						<Button onClick={() => signIn()} className="hidden sm:block">
							Sign In
						</Button>
						*/
            <Link
              href="/signin"
              className={cn(
                "hidden sm:block",
                buttonVariants({ variant: "default" }),
              )}
            >
              Sign In
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
