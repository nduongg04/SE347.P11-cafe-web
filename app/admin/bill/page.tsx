'use client'
import * as React from "react";
import { Button } from "@/components/ui/button";

import { Bill, columns } from "./columns";
import { DataTable } from "./data-table";
import { getData } from "./fetchingData";
import { DateRangePicker } from '@/components/custom/date-range-picker';


const bill = () => {
    const [data, setData] = React.useState<Bill[]>([])
    const [startDate, setStartDate] = React.useState<Date | undefined>()
    const [endDate, setEndDate] = React.useState<Date | undefined>()
    React.useEffect( () => {
        async function fetchData (){
            const datas = await getData();
            setData(datas);
        }
        fetchData();
    }, [])
    return (
        <div>
            <h2 className="text-xl font-semibold">Bill Management</h2>
            <div className="flex justify-end mr-4 mb-4">
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
                <Button variant="secondary" className="mx-4">Dowload all</Button>
                <Button variant="destructive">Delete bill</Button>
            </div>
            <div>
                <DataTable columns={columns} data={data} />
                <div>{startDate?.toDateString()}</div>
                <div>{endDate?.toDateString()}</div>
            </div>
        </div>
    )
};
export default bill;