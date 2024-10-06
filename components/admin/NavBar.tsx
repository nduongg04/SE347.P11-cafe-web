"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../Icons";

type IconNameType =
  | "dashboard"
  | "menu"
  | "voucher"
  | "customer"
  | "order"
  | "employee"
  | "analytics";

const NavBar = () => {
  const routes: {
    label: string;
    href: string;
    icon: IconNameType;
  }[] = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: "dashboard",
    },
    {
      label: "Menu",
      href: "/admin/menu",
      icon: "menu",
    },
    {
      label: "Voucher",
      href: "/admin/voucher",
      icon: "voucher",
    },
    {
      label: "Customer",
      href: "/admin/customer",
      icon: "customer",
    },
    {
      label: "Order",
      href: "/admin/order",
      icon: "order",
    },
    {
      label: "Employee",
      href: "/admin/employee",
      icon: "employee",
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
      icon: "analytics",
    },
  ];
  const pathname = usePathname();
  const getIconComponent = (iconName: IconNameType, className?: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  return (
    <div className="flex h-screen w-1/6 flex-col gap-10 bg-white p-7">
      <div className="flex flex-col gap-1">
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={150}
          height={150}
        />
        <p className="font-barlow text-xs font-medium text-light-gray">
          Modern Admin Dashboard
        </p>
      </div>
      <div className="flex flex-col gap-7">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.label}
            className="flex items-center gap-2 transition-colors"
          >
            {getIconComponent(
              route.icon,
              `${
                pathname === route.href
                  ? "text-dark-green"
                  : "text-black-purple"
              } transition-colors duration-300`,
            )}
            <span
              className={`${
                pathname === route.href
                  ? "text-dark-green"
                  : "text-black-purple"
              } text-base font-medium transition-colors duration-300`}
            >
              {route.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default NavBar;
