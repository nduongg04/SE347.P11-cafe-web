"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setCookies(key: string, value: string) {
    const cookieStorage = cookies();
    cookieStorage.set(key, value, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
}

export async function getCookies(key: string) {
    const cookieStorage = cookies();
    const value = cookieStorage.get(key);
    return value;
}

export async function navigate(url: string) {
    redirect(url);
}
