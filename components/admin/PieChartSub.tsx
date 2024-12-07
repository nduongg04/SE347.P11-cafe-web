import React from "react";
import { Pie, Label, PieChart } from "recharts";

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

export type PieChartSubProps = {
    chartConfig: ChartConfig;
    chartData: any;
    labelText: string;
	footer: string;
	dataKey: string;
	nameKey: string;
};

const PieChartSub = ({
    chartConfig,
    chartData,
    labelText,
	footer,
	dataKey,
	nameKey,
}: PieChartSubProps) => {
    return (
        <Card className="flex flex-col border-0 fill-black-purple text-black-purple shadow-none">
            <CardContent className="flex max-h-[250px] min-h-[150px] flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto flex aspect-square zoom-in-50"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent hideLabel isPercentage />
                            }
                        />
                        <Pie
                            data={chartData}
                            dataKey={dataKey}
                            nameKey={nameKey}
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
                                                    {labelText}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
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
                    {footer}
                </div>
            </CardFooter>
        </Card>
    );
};

export default PieChartSub;
