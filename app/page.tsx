"use client";

import { getCookies, navigate } from "@/lib/action";
import { useEffect, useState } from "react";
import { User } from "./login/page";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleCookie = async () => {
      const userCookie = await getCookies("user");
      const userString = userCookie?.value;
      setProgress(50);
      if (userString) {
        const user: User = JSON.parse(userString);
        setProgress(100);
        if (user.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/employee");
        }
      } else {
        navigate("/login");
      }
    };
    handleCookie();
  });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#00B074] text-white">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Redirecting you</h1>
        <p className="mb-8 text-xl">
          Please wait while we redirect you to your destination
        </p>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/30">
            <div className="h-full w-full bg-white/30 transition-all duration-100 ease-out">
              <div
                className="h-full bg-white transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <ArrowRight className="h-6 w-6 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
export default Home;
