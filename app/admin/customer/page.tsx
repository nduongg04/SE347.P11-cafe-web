"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";

import { Customer, columns, CustomerType, customerTypeColumns } from "./columns";
import { DataTable } from "./data-table";
import { DataTableMemberShip } from "./data-table-membership";
import { getCustomerData, getCustomerTypeData } from "./fetchingData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const customer = () => {
    const [data, setData] = React.useState<Customer[]>([]);
    const [customerType, setCustomerType] = React.useState<CustomerType[]>([]);
    React.useEffect(() => {
        async function fetchData() {
            const datas = await getCustomerData();
            setData(datas);
            const customerTypeData = await getCustomerTypeData();
            setCustomerType(customerTypeData);
        }
        fetchData();
    }, []);
    return (
        <Tabs defaultValue="customer" className="m-4">
            <TabsList className="grid w-[50%] grid-cols-2">
                <TabsTrigger value="customer" className="text-xl font-semibold p-2 items-start justify-start">Customer Management</TabsTrigger>
                <TabsTrigger value="membership" className="text-xl font-semibold p-2 items-start justify-start">Membership Management</TabsTrigger>
            </TabsList>
            <TabsContent value="customer">
                <div>
                    <DataTable columns={columns} data={data} />
                </div>
            </TabsContent>
            <TabsContent value="membership">
                <div>
                    <DataTableMemberShip columns={customerTypeColumns} data={customerType} />
                </div>
            </TabsContent>      
        </Tabs>
    );
};
export default customer;
