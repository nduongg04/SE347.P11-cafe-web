import { Bill } from "./columns";

export async function getData(): Promise<Bill[]> {
    // Fetching data from the server
    return [
        {
           id:  "1",
            customerId: "1",
            voucherId: "1",
            staffId: "1",
            payTypeId: "1",
            status: "waiting",
            totalPrice: 100,
            createdAt: new Date("2021-09-01")
        }
    ];
}