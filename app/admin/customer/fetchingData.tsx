import { Customer, CustomerType } from "./columns";

export async function getCustomerData(): Promise<Customer[]> {
    const customers: Customer[] = Array.from({ length: 35 }, (_, i) => ({
        customerId: `${i + 1}`,
        customerTypeId: `${i + 1}`,
        customerTypeName: `Customer Type ${i + 1}`,
        customerName: `Customer ${i + 1}`,
        phoneNumber: `0123456789${i + 1}`,
        revenue: 1000000 * (i + 1),
    }));

    return customers;
}
export async function getCustomerTypeData(): Promise<CustomerType[]> {
    const types: CustomerType[] = Array.from({ length: 35 }, (_, i) => ({
        customerTypeId: `${i + 1}`,
        customerTypeName: `Customer Type ${i + 1}`,
        boundaryRevenue: 1000000 * (i + 1),
        discount: 1 * (i + 1),
    }));

    return types;
}
