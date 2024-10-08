import { Bill } from "./columns";

export async function getData(): Promise<Bill[]> {
    const bills: Bill[] = Array.from({ length: 35 }, (_, i) => ({
        id: `${i + 1}`,
        customerId: `${i + 1}`,
        voucherId: `${i + 1}`,
        staffId: `${i + 1}`,
        payTypeId: `${i + 1}`,
        status: "waiting",
        totalPrice: 10000 * (i + 1),
        createdAt: new Date(`2021-09-${(i % 30) + 1}`),
    }));

    return bills;
}
