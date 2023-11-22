"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  const btnClasses =
    "border-2 border-gray-950 px-3 py-1 rounded-lg backdrop-brightness-95 hover:backdrop-brightness-105 transition duration-300 ease-in-out shadow-md shadow-gray-950/50";

  const loader = () => {
    return `${session?.user.image}`;
  };
  return (
    <nav className="flex h-16 w-screen items-center justify-between gap-6 bg-amber-400 text-xl font-semibold text-black">
      <div className="h-16 w-1/3" />
      <div className="flex h-16 w-1/3 items-center justify-center text-center md:gap-6">
        <Link href="/bond">Bond Calculator</Link>
        <Link href="/blender">Blender Calculator</Link>
      </div>
      <div className="mr-4 flex w-1/3 justify-end">
        {session ? (
          <div className="flex h-16 items-center gap-2">
            <Image
              loader={() => loader()}
              src={loader()}
              alt="Profile Picture"
              width="36"
              height="36"
              className="rounded-lg"
            />
            <span>Hello, @{session.user.name}</span>
            <button className={btnClasses}>
              <Link href="/api/auth/signout">Sign out</Link>
            </button>
          </div>
        ) : (
          <Link href="/api/auth/signin">Sign in with Discord</Link>
        )}
      </div>
    </nav>
  );
}
