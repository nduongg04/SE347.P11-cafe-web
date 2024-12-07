"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../Icons";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { resetCookies } from "@/lib/action";
import { useRouter } from "next/router";

type IconNameType =
  | "dashboard"
  | "menu"
  | "voucher"
  | "customer"
  | "order"
  | "employee"
  | "bill"
  | "analytics";

const Navbar = () => {
  //   const [prevPath, setPrevPath] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const routes: {
    label: string;
    href: string;
    icon: IconNameType;
  }[] = [
    {
      label: "Order",
      href: "/employee",
      icon: "order",
    },
    {
      label: "Customer",
      href: "/employee/customer",
      icon: "customer",
    },
    {
      label: "Bill",
      href: "/employee/bill",
      icon: "bill",
    },
  ];

  const getIconComponent = (iconName: IconNameType, className?: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent ? <IconComponent className={className} /> : null;
  };
  const onLogout = async () => {
    await resetCookies();
    router.replace("/login");
  };
  return (
    <div className="flex min-h-full w-1/6 flex-col gap-10 bg-white">
      <div className="flex flex-col gap-1 p-7">
        <Link href="/employee">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={150}
            height={150}
          />
        </Link>
        <p className="font-barlow text-xs font-medium text-light-gray">
          Modern Admin Dashboard
        </p>
      </div>
      <div className="relative flex flex-col">
        <div
          className="absolute inset-0 flex justify-center gap-5 pr-7 transition-all duration-300"
          style={{
            transform: `translateY(${routes.findIndex((route) => route.href === pathname) * 100}%)`,
            height: `${100 / routes.length}%`,
          }}
        >
          <Image
            src="/assets/icons/nav-highlight.svg"
            alt="nav-highlight"
            width={4}
            height={4}
            className={cn("")}
          />
          <div className="h-full w-full rounded-md bg-dark-green/15" />
        </div>

        <div className="flex flex-1 flex-col">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "relative z-10 flex flex-1 items-center gap-2 px-8 py-3 transition-all duration-100",
                {
                  "text-dark-green": pathname === route.href,
                  "text-black-purple": pathname !== route.href,
                },
              )}
            >
              {getIconComponent(route.icon, "transition-colors duration-300")}
              <span className="text-base font-medium transition-colors duration-300">
                {route.label}
              </span>
            </Link>
          ))}
        </div>
        <button
          className="mx-6 mb-6 rounded-md bg-[#FF6767] py-2 font-bold text-white shadow-md"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
