"use client";

import { useRef } from "react";

const LoginPage = () => {
    const usernameInpput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const baseURL = process.env.BASE_URL;
    async function onClick() {
        var data = {
            username: usernameInpput.current?.value,
            password: passwordInput.current?.value,
        };
        var response = await fetch(`${baseURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const res = await response.json();
        console.log(res);
    }

    return (
        <div className="flex h-screen items-center justify-center gap-8">
            <img
                src="assets\images\login-image.png"
                alt=""
                className="hidden max-w-[100%] md:block"
            />
            <div className="flex w-[30%] min-w-[400px] flex-col gap-5 rounded-xl bg-white px-3 py-4 shadow-2xl">
                <div className="bg-gradient-to-r from-[#3372FE] via-[#318BEE] to-[#30A2DF] bg-clip-text text-[25px] font-semibold text-transparent">
                    Login your account
                </div>
                <hr className="" />
                <input
                    ref={usernameInpput}
                    className="rounded-xl border border-[#D1D5DB] p-3 text-[16px] caret-[#318BEE] focus:outline-[#318BEE]"
                    placeholder="Username"
                />
                <input
                    ref={passwordInput}
                    type="password"
                    className="rounded-xl border border-[#D1D5DB] p-3 text-[16px] caret-[#318BEE] focus:outline-[#318BEE]"
                    placeholder="Password"
                />
                <button
                    className="cursor-pointer rounded-xl bg-[#3371FF] p-3 text-[16px] text-white"
                    onClick={onClick}
                >
                    Sign in
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
