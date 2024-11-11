"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CakeSlice,
  Coffee,
  PenSquare,
  Shapes,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function DishCardMenu({
  dish,
  onModify,
  onDelete,
}: {
  dish: Dish;
  onModify: () => void;
  onDelete: () => void;
}) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <Image src={dish.image} alt={dish.productName} fill={true} className="object-cover" />
        <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            className="mr-2 bg-[#00B074] text-white hover:bg-[#00956A]"
            onClick={onModify}
          >
            <PenSquare className="mr-2 h-4 w-4" />
            Modify
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                className="bg-red-500 text-white hover:bg-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader className="flex flex-col items-center">
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <TriangleAlert className="size-20 text-[#ff0000]" />
                Are you sure you want to delete the selected customers?
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-green-600 hover:bg-green-500"
                  onClick={onDelete}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center space-x-2">
          {dish.categoryName === "Food" ? (
            <CakeSlice className="h-4 w-4 text-[#00B074]" />
          ) : dish.categoryName === "Drink" ? (
            <Coffee className="h-4 w-4 text-[#00B074]" />
          ) : (
            <Shapes className="h-4 w-4 text-[#00B074]" />
          )}
          <span className="text-sm text-gray-500">{dish.categoryName}</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold">{dish.productName}</h3>
        <span className="text-lg font-bold text-[#00B074]">
          {dish.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
        {dish.isSoldOut && <span className="ml-2 text-red-500">Sold Out</span>}
      </CardContent>
    </Card>
  );
}
