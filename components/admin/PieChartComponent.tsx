"use client";

import { ChartConfig } from "@/components/ui/chart";
import PieChartSub from "./PieChartSub";
import ComponentHeader from "./ComponentHeader";

export type PieChartComponentProps = {
    from: Date;
    to: Date;
};

export function PieChartComponent({ from, to }: PieChartComponentProps) {
    const chartInfos: {
        chartData: { [key: string]: number | string }[];
        chartConfig: ChartConfig;
        footer: string;
        labelText: number;
        dataKey: string;
        nameKey: string;
    }= 
        {
            chartData: [
                { time: "This period", orders: 19, fill: "#2D9CDB" },
                {
                    time: "Remaining",
                    orders: 81,
                    fill: "rgb(45 156 219 / 0.2)",
                },
            ],
            chartConfig: {
                orders: {
                    label: "Orders",
                },
                remaining: {
                    label: "Remaining",
                    color: "rgb(45 156 219 / 0.2)",
                },
                thisPeriod: {
                    label: "This period",
                    color: "#2D9CDB",
                },
            },
            labelText: 19,
            footer: "Orders",
            dataKey: "orders",
            nameKey: "time",
        }
    return (
        <div className="shadow-black-medium flex flex-col justify-between gap-2 rounded-lg bg-white p-4">
            <ComponentHeader
                title="Pie Chart"
                description="See total revenue and orders for the this period"
            />
            <div className="flex w-full justify-center">
                    <PieChartSub
                    labelText={`${chartInfos.labelText.toLocaleString()}%`}
                    footer={chartInfos.footer}
                    chartData={chartInfos.chartData}
                    chartConfig={chartInfos.chartConfig}
                    dataKey={chartInfos.dataKey}
                    nameKey={chartInfos.nameKey}
                />
            </div>
        </div>
    );
}
