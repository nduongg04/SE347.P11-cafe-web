"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

export const description = "A donut chart with text";

const chartData = [
    { time: "Remaining", revenue: 20, fill: "rgba(255 91 91 / 0.2)" },
    { time: "This period", revenue: 80, fill: "#FF5B5B" },
];

const chartConfig = {
    revenue: {
        label: "Revenue",
    },
    remaining: {
        label: "Remaining",
        color: "rgba(255 91 91 / 0.2)",
    },
    thisPeriod: {
        label: "This period",
        color: "#FF5B5B",
    },
} satisfies ChartConfig;

export function PieChartComponent() {
    const thisPeriodRevenue = chartData[1].revenue;

    return (
        <div className="flex justify-between gap-4 bg-white">
			<h1>Pie Chart</h1>
            <Card className="flex flex-col border-0 fill-black-purple text-black-purple shadow-none"> 
                <CardContent className="flex max-h-[250px] min-h-[150px] flex-1 gap-4 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square zoom-in-50 flex"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        hideLabel
                                        isPercentage
                                    />
                                }
                            />
                            <Pie
                                data={chartData}
                                dataKey="revenue"
                                nameKey="time"
                                innerRadius={30}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (
                                            viewBox &&
                                            "cx" in viewBox &&
                                            "cy" in viewBox
                                        ) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-black-purple text-xl font-bold"
                                                    >
                                                        {`${thisPeriodRevenue.toLocaleString()}%`}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={
                                                            (viewBox.cy || 0) +
                                                            24
                                                        }
                                                        className="fill-muted-foreground"
                                                    ></tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="gap-2 font-medium leading-none">
                        Total Revenue
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
