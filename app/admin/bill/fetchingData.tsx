import { Bill, BillInfo } from "./columns";

export async function getData(): Promise<Bill[]> {
    const bills: Bill[] = Array.from({ length: 35 }, (_, i) => ({
        id: `${i + 1}`,
        customerId: `${i + 1}`,
        voucherId: `${i + 1}`,
        staffId: `${i + 1}`,
        payTypeId: `${i + 1}`,
        status: "Waiting",
        totalPrice: 10000 * (i + 1),
        createdAt: new Date(`2024-9-${(i % 30) + 1}`),
        billInfo:  Array.from({ length: 15 }, (_, j) => ({
            billID: `${i + 1}`,
            productID: `${j + 1}`,
            productName: `Product ${j + 1}`,
            productCount: j + 1,
            totalPrice: 1000 * (j + 1),
            productPrice: 1000 * (j + 1),
        })),
    }));

    return bills;
}
