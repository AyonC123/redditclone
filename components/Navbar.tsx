"use client";

import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="px-12 py-5 flex justify-between items-center text-center sticky top-0 backdrop-blur-xl border-b gap-10">
      {/* <Image src={"/logo.png"} alt="logo image" height={30} width={125} /> */}
      <Link href={"/"}>
        <h1 className="text-3xl font-bold">RedditC</h1>
      </Link>
      <Input className="max-w-[35rem]" placeholder="Search" />
      <ul className="flex gap-10 items-center">
        <li className="hover:font-bold ease-linear duration-150">
          {session ? (
            <div className="flex justify-evenly gap-10">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    src={session.user?.image!}
                    alt="Profile Image"
                    width={30}
                    height={30}
                    className="h-10 w-10 rounded-3xl"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/r/create"}>Create Community</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div onClick={() => signOut()} className="cursor-pointer">
                      Sign Out
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              href="/signin"
              className={buttonVariants({ variant: "default" })}
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
