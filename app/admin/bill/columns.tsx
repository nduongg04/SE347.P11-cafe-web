"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pencil, ArrowUpDown } from "lucide-react"
import { Fragment } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FilterFn } from "@tanstack/react-table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillInfo = {
  billID: string
  productID: string
  productName: string
  productCount: number
  totalPrice: number
  productPrice: number
}
export type Bill = {
  id: string
  customerId: string
  voucherId: string
  staffId: string
  payTypeId: string
  status: "Waiting" | "Paid" 
  totalPrice: number
  createdAt: Date
  billInfo: BillInfo[]
}
export const dateRangeFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const [start, end] = filterValue as [Date | undefined, Date | undefined];
  const rowDate = new Date(row.getValue(columnId)); // Getting the date from the row

  if (start && end) {
    return rowDate >= start && rowDate <= end;
  }
  if (start) {
    return rowDate >= start;
  }
  if (end) {
    return rowDate <= end;
  }
  return true; // No filter if both start and end are undefined
};
export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    filterFn: dateRangeFilter,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => { 
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return row.getValue("status")==="Waiting"? <Label className="text-red-500">Waiting</Label> : <Label className="text-green-500">Paid</Label>
    }
  },
  {
    id: "actions",
      cell: ({ row }) => {
        const bill = row.original
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Pencil className="size-4 cursor-pointer"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[925px]">
              <DialogHeader>
                <DialogTitle>Edit bill status #{bill.id}</DialogTitle>
                <DialogDescription>
                  Make changes to bill status here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 w-[100%]">
                <div className="flex justify-between">
                    <Label 
                      >Staff: <span className="font-normal">{bill.staffId}</span></Label>            
                    <Label 
                      >Customer: <span className="font-normal">{bill.customerId}</span></Label>
                    <div className="flex">
                      <Label className="mx-4">Status</Label>
                      <RadioGroup defaultValue={bill.status}>
                        <div className="flex items-center space-x-2 text-red-500">
                          <RadioGroupItem value="Waiting" id="r1" />
                          <Label htmlFor="r1">Waiting</Label>
                        </div>
                        <div className="flex items-center space-x-2 text-green-400">
                          <RadioGroupItem value="Paid" id="r2" />
                          <Label htmlFor="r2">Paid</Label>
                        </div>                   
                      </RadioGroup>              
                    </div>
                </div>
                <Label>Product List</Label>
                <div className="overflow-y-auto max-h-48">
                    <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead >Total Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody >
                      {
                        bill.billInfo.map((billInfo, index) => (
                          <Fragment key={billInfo.productID}>
                              <TableRow>
                                <TableCell className="text-left">{index + 1}</TableCell>
                                <TableCell>{billInfo.productName}</TableCell>
                                <TableCell>{billInfo.productCount}</TableCell>
                                <TableCell>{billInfo.productPrice}</TableCell>
                                <TableCell>{billInfo.totalPrice}</TableCell>
                              </TableRow>
                            </Fragment>
                          ))
                        }
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-between">
                  <Label>Payment Type: <span className="font-normal">{bill.payTypeId}</span></Label>       
                  <Label>Created At: <span className="font-normal">{bill.createdAt.toUTCString()}</span></Label>   
                </div>
                <Label htmlFor="totalPrice" className="text-red-600 text-right">Sub Total: <span>{bill.totalPrice}</span></Label>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-green-600 hover:bg-green-500">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
    }
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]
