"use client";

import { Button } from "@/components/ui/button";
import {
  PenSquare,
  Shapes,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
} from "../../ui/alert-dialog";

export default function TableCardMenu({
  table,
  onModify,
  onDelete,
}: {
  table: Table;
  onModify: () => void;
  onDelete: () => void;
}) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <Image src='/assets/icons/table.svg' alt="table" fill={true} className="object-contain" />
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
                Are you sure you want to delete the selected table?
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
          <span className="text-sm text-gray-500">{table.tableType.tableNameType}</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold">#{table.tableNumber} 
          {table.status == "Not booked" ? 
           <span className="text-green-500 ml-2">{table.status}</span>
            : 
            table.status == "Booked" ?
            <span className="text-red-500 ml-2">{table.status}</span>
            : <span className="text-yellow-500 ml-2">{table.status}</span>
          } </h3>
      </CardContent>
    </Card>
  );
}
