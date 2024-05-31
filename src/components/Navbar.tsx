"use client"

import "@/styles/globals.css";
import Button from "./ui/Button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session }: any = useSession();
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <h2>Qwzzle.io</h2>
        </div>
        <div className="nav-menu">
          {!session ? (
            <Link href={"/login"}>
              <Button color="white" bgColor="black" title="Login" />
            </Link>
          ) : (
            <button style={{}} onClick={() => signOut()}>Logout</button>
          )}
        </div>
      </div>
    </>
  );
}
