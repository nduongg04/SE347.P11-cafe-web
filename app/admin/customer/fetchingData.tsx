import { toast } from "sonner";
import { Customer, CustomerType } from "./columns";
import { url, token } from "@/constants";

export async function getCustomerData(): Promise<Customer[]> {
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
        customerType: customer.customerType==null? "Visting customer" : customer.customerType,
    }));
    return customers;
}
export async function getCustomerTypeData(): Promise<CustomerType[]> {
   const response = await fetch(`${url}/customertype/getall`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        toast.error("Failed to fetch data: " + data.message);
    }
    const types: CustomerType[] = data.map((type: any) => ({
        customerTypeId: type.customerTypeID,
        customerTypeName: type.customerTypeName,
        discountValue: type.discountValue,
        boundaryRevenue: type.boundaryRevenue,
    }));

    return types;
}
