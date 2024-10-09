import { Staff } from "./columns";

export async function getData(): Promise<Staff[]> {
    const staffs: Staff[] = Array.from({ length: 35 }, (_, i) => ({
        appUserId: `${i + 1}`,
        staffName: `Staff ${i + 1}`,
        userName: `staff${i + 1}`,
        isAdmin: i % 2 === 0,
        password: `password${i + 1}`,
    }));

    return staffs;
}
