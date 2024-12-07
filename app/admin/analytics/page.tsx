"use client";

import Profile from "@/components/admin/Profile";
import { staff } from "@/constants";

import { AreaChartComponent } from "@/components/admin/AreaChartComponent";
import Badge from "@/components/admin/Badge";
import { PieChartComponent } from "@/components/admin/PieChartComponent";
import TopDishes from "@/components/admin/TopDishes";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const Analytics = () => {
    const [selectedDate, setSelectedDate] = useState<DateRange | undefined>({
        from: new Date(new Date().setDate(new Date().getDate() - 7)),
        to: new Date(),
    });
    const [badgeInfos, setBadgeInfos] = useState([
        {
            iconHref: "/assets/icons/orders.svg",
            value: "75",
            title: "Total Orders",
        },
        {
            iconHref: "/assets/icons/revenue.svg",
            value: "$128",
            title: "Total Revenue",
        },
    ]);
    return (
        <div className="font-barlow flex flex-1 flex-col gap-10 p-5">
            <div className="flex items-center justify-between gap-10">
                <div className="flex flex-1 flex-wrap items-center justify-between gap-10">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-semibold">Analytics</h1>
                        <p className="text-sm text-gray-500">
                            Hi, {staff.staffName}. Let’s see analytics of the
                            coffee shop
                        </p>
                    </div>
                    <Popover>
                        <PopoverTrigger>
                            <div className="shadow-black-medium flex items-center gap-2 rounded-lg bg-white px-4 py-2">
                                <div className="h-full rounded-lg bg-[#2D9CDB]/15 p-1">
                                    <Image
                                        src="/assets/icons/calendar.svg"
                                        width={30}
                                        height={30}
                                        alt="calendar"
                                    />
                                </div>
                                <div className="flex flex-col justify-start gap-0.5">
                                    <span className="text-start text-sm font-medium">
                                        Filter Period
                                    </span>
                                    <span className="font text-xs">
                                        {formatDate(
                                            selectedDate?.from || new Date(),
                                            "dd MMM yyyy",
                                        )}{" "}
                                        -{" "}
                                        {formatDate(
                                            selectedDate?.to || new Date(),
                                            "dd MMM yyyy",
                                        )}
                                    </span>
                                </div>
                                <Image
                                    src="/assets/icons/chevron-down.svg"
                                    width={20}
                                    height={20}
                                    alt="calendar"
                                />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto">
                            <Calendar
                                initialFocus
                                defaultMonth={selectedDate?.from || new Date()}
                                mode="range"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="rounded-md border"
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="h-10 w-px bg-bright-gray" />
                <Profile />
            </div>
            <div className="flex flex-wrap justify-between gap-20">
                {badgeInfos.map((badgeInfo, index) => (
                    <Badge
                        key={index}
                        iconHref={badgeInfo.iconHref}
                        value={badgeInfo.value}
                        title={badgeInfo.title}
                    />
                ))}
            </div>
            <div className="grid grid-flow-col grid-cols-3 justify-between gap-20">
                <PieChartComponent
                    from={
                        selectedDate?.from ||
                        new Date(new Date().setDate(new Date().getDate() - 7))
                    }
                    to={selectedDate?.to || new Date()}
                />
                <AreaChartComponent
                    from={
                        selectedDate?.from ||
                        new Date(new Date().setDate(new Date().getDate() - 7))
                    }
                    to={selectedDate?.to || new Date()}
                />
            </div>
            <TopDishes />
        </div>
    );
};
export default Analytics;
