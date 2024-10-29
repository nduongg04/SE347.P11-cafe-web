"use client";

import { getCookies, navigate } from "@/lib/action";
import { useEffect } from "react";
import { User } from "./login/page";

const Home = () => {
    useEffect(() => {
        const handleCookie = async () => {
            const userCookie = await getCookies("user");
            const userString = userCookie?.value;
            console.log(userString);
            if (userString) {
                const user: User = JSON.parse(userString);
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
    return <div>Home</div>;
};
export default Home;
