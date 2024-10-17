"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import ComponentHeader from "./ComponentHeader";

export type AreaChartComponentProps = {
    from: Date;
    to: Date;
};

export function AreaChartComponent({ from, to }: AreaChartComponentProps) {
    const chartData = [
        { date: "21/05", orders: 237 },
        { date: "22/05", orders: 73 },
        { date: "23/05", orders: 209 },
        { date: "24/05", orders: 214 },
        { date: "25/05", orders: 214 },
        { date: "26/05", orders: 214 },
        { date: "27/05", orders: 214 },
        { date: "28/05", orders: 50 },
        { date: "29/05", orders: 153 },
        { date: "30/05", orders: 234 },
        { date: "31/05", orders: 54 },
		
    ];

    const chartConfig = {
        orders: {
            label: "Orders",
            color: "#6EC8EF",
        },
    } satisfies ChartConfig;
    return (
        <Card className="col-span-2 border-none rounded-lg shadow-black-medium">
            <CardHeader>
                <ComponentHeader
                    title="Order Chart"
                    description="See orders for the this period"
                />
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[150px] min-w-full min-h-[150px] ">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 15,
                            right: 15,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickFormatter={(value) => value.slice(0, 5)}
                            axisLine={false}
							interval={0}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <defs>
                            <linearGradient
                                id="fillDesktop"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#6EC8EF"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#6EC8EF"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="orders"
                            type="natural"
                            fill="url(#fillDesktop)"
                            fillOpacity={0.4}
                            stroke="#6EC8EF"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
