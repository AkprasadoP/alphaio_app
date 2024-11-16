"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  // Ensure userId is serializable
  const serializedUserId = userId ? userId.toString() : null;

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          const route =
            link.route === "/profile"
              ? `${link.route}/${serializedUserId}`
              : link.route;

          return (
            <Link
              href={route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-red-500 "}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <div
            onClick={async () => {
              await fetch("/api/clerk-signout", { method: "POST" }); // Optional server-side sign-out
              router.push("/sign-in");
            }}
            className="flex cursor-pointer gap-4 p-4"
          >
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
            <p className="text-light-2 max-lg:hidden">Logout</p>
          </div>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
