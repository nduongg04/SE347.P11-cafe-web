import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pizza, Utensils, Salad } from "lucide-react";

interface Dish {
    categoryName: string;
    productName: string;
    orderCount: number;
    price: number;
    imageUrl: string;
    categoryIcon: React.ElementType;
    color: string;
}

const topDishes: Dish[] = [
    {
        categoryName: "Burger",
        productName: "Classic Cheeseburger",
        orderCount: 532,
        price: 8.99,
        imageUrl:
            "https://img.pikbest.com/ai/illus_our/20230423/07ed8112048ac2452879ab5e4d67c821.jpg!w700wp",
        categoryIcon: Utensils,
        color: "bg-orange-500",
    },
    {
        categoryName: "Pizza",
        productName: "Margherita Pizza",
        orderCount: 498,
        price: 12.99,
        imageUrl:
            "https://img.pikbest.com/ai/illus_our/20230423/07ed8112048ac2452879ab5e4d67c821.jpg!w700wp",
        categoryIcon: Pizza,
        color: "bg-red-500",
    },
    {
        categoryName: "Sushi",
        productName: "California Roll",
        orderCount: 456,
        price: 14.99,
        imageUrl:
            "https://img.pikbest.com/ai/illus_our/20230423/07ed8112048ac2452879ab5e4d67c821.jpg!w700wp",
        categoryIcon: Utensils,
        color: "bg-green-500",
    },
    {
        categoryName: "Pasta",
        productName: "Spaghetti Carbonara",
        orderCount: 423,
        price: 11.99,
        imageUrl:
            "https://img.pikbest.com/ai/illus_our/20230423/07ed8112048ac2452879ab5e4d67c821.jpg!w700wp",
        categoryIcon: Utensils,
        color: "bg-yellow-500",
    },
    {
        categoryName: "Salad",
        productName: "Caesar Salad",
        orderCount: 387,
        price: 9.99,
        imageUrl:
            "https://img.pikbest.com/ai/illus_our/20230423/07ed8112048ac2452879ab5e4d67c821.jpg!w700wp",
        categoryIcon: Salad,
        color: "bg-emerald-500",
    },
];

export default function DishCard() {
    return (
        <div className="w-full">
            <h2 className="mb-6 text-xl font-semibold text-primary">
                Top Dishes
            </h2>
            <div className="grid w-full grid-cols-2 justify-between gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {topDishes.map((dish, index) => (
                    <Card
                        key={index}
                        className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        <div
                            className={`relative flex h-32 items-center justify-center pt-2`}
                        >
                            <div className="absolute inset-0 backdrop-blur-md"></div>
                            <Image
                                src={dish.imageUrl}
                                alt={dish.productName}
                                width={200}
                                height={200}
                                className="relative z-10 w-full border-2 border-white object-cover"
                            />
                            <div className="bg-dark-green/10 absolute left-1 top-1 z-20 rounded-full  p-1">
                                <dish.categoryIcon className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                        <CardContent className="p-3">
                            <h3 className="bg-dark-green-foreground/10 text-dark-green-foreground mb-2 w-fit truncate rounded-lg px-2 text-sm font-semibold">
                                #{dish.categoryName}
                            </h3>
                            <h3
                                className="mb-2 truncate text-sm font-semibold"
                                title={dish.productName}
                            >
                                {dish.productName}
                            </h3>
                            <div className="flex items-center justify-between text-xs">
                                <Badge
                                    variant="secondary"
                                    className="text-dark-green-foreground bg-yellow-200 px-2 py-1 font-semibold text-primary"
                                >
                                    <span className="">{dish.orderCount}</span>
                                    &nbsp;Orders
                                </Badge>
                                <span className="text-lg font-bold text-primary">
                                    ${dish.price.toFixed(2)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
