import React from "react";
import Navbar from "@/components/employee/Navbar";
type Props = {
  children: React.ReactNode;
};

export default function EmployeeLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-row bg-[#F3F2F7]">
      <Navbar />
      <div className="mx-[1%] flex-1">{children}</div>
    </div>
  );
}
