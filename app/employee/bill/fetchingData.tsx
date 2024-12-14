import { Bill, BillInfo } from "./columns";
import { getCookies } from "@/lib/action";
import { toast } from "sonner";
export async function getData(): Promise<Bill[]> {
    const url = process.env.BASE_URL;
    const cookies = await getCookies('refreshToken');
    const refreshToken = cookies?.value;
    try{
        const response = await fetch(`${url}/bill/getall`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${refreshToken}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message)
        }
    
        const parseDate = (dateString: string): Date => {
            const [day, month, year] = dateString.split('/').map(Number);
            return new Date(year, month - 1, day);
        };
        const fetchedBills: Bill[] = data.map((item: any) => ({
            id: item.billId,
            customer: item.customer ? item.customer : "Visiting Customer",
            voucherValue: item.voucherValue,
            staff: item.staff ? item.staff : "Unknown Staff",
            payType: item.payType ? item.payType : "Unknown Pay Type",
            status: item.status,
            totalPrice: item.totalPrice,
            createdAt: parseDate(item.createdAt),
            dateString: item.createdAt,
            billInfo: item.billDetailDTOs.map((info: any) => ({
                productName: info.productName,
                productCount: info.productCount,
                totalPriceDtail: info.totalPriceDtail,
                productPrice: info.productPrice,
            })),
        }));
        return fetchedBills;;
    }catch(e){
        toast.error("Failed to fetch data: " + e);
        return [];
    }
}
