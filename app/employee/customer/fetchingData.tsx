import { toast } from "sonner";
import { Customer} from "./columns";
import { getCookies } from "@/lib/action";

export async function getCustomerData(): Promise<Customer[]> {
    const cookies = await getCookies("refreshToken");
    const token = cookies?.value;
    const url = process.env.BASE_URL;
    try{
        const response = await fetch(`${url}/customer/getall`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            toast.error("Failed to fetch data: " + data.message);
            
        }
        const customers: Customer[] = data.map((customer: any) => ({
            customerId: customer.customerID,
            customerName: customer.customerName,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            revenue: customer.revenue,
            customerType: customer.customerType,
        }));
        return customers;
    }catch(e){
        toast.error("Failed to fetch data: " + e);
        return [];
    }
}
