"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";

import { Staff, columns } from "./columns";
import { DataTable } from "./data-table";
import { getData } from "./fetchingData";
import { DateRangePicker } from "@/components/custom/date-range-picker";

const EmployeePage = () => {
    const [data, setData] = React.useState<Staff[]>([]);
    React.useEffect(() => {
        async function fetchData() {
            const datas = await getData();
            setData(datas);
        }
        fetchData();
    }, []);
    return (
        <div className="m-4">
            <h2 className="text-xl font-semibold">Staff Management</h2>
            <div>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};
export default EmployeePage;
