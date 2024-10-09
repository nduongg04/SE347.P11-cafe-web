"use client";

import { ColumnDef } from "@tanstack/react-table"
import { Pencil, ArrowUpDown } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Customer = {
  customerId: string
  customerTypeId: string
  customerTypeName: string
  customerName: string
  phoneNumber: string
  revenue: number
}

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "customerId",
    header: "ID",
  },
  {
    accessorKey: "customerName",
    header: "Full name"
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number"
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => { 
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Spending
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "customerTypeName",
    header: "Membership" 
  },
  {
    id: "actions",
      cell: ({ row }) => {
        const customer = row.original
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Pencil className="size-4 cursor-pointer"/>
            </DialogTrigger>
            <DialogContent >
              <DialogHeader>
                <DialogTitle>Edit customer #{customer.customerId}</DialogTitle>
                <DialogDescription>
                  Make changes to customer here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 w-[100%]">
                <table className="border-spacing-2 border-separate">
                  <tr >
                    <td >Full name</td>
                    <td ><Input defaultValue={customer.customerName} /></td>
                  </tr>
                  <tr >
                    <td >Phone Number</td>
                    <td ><Input defaultValue={customer.phoneNumber} /></td>
                  </tr>
                  <tr>
                    <td >Membership</td>
                    <td ><Input defaultValue={customer.customerTypeName} disabled={true} /></td>
                  </tr>
                  <tr>
                    <td >Spending</td>
                    <td ><Input defaultValue={new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(parseFloat(customer.revenue.toString()))}
                      disabled={true} />
                    </td>
                  </tr>
                </table>            
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

export type CustomerType = {
  customerTypeId: string
  customerTypeName: string
  boundaryRevenue: number
  discount: number
}
export const customerTypeColumns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "customerTypeId",
    header: "ID",
  },
  {
    accessorKey: "customerTypeName",
    header: "Membership"
  },
  {
    accessorKey: "boundaryRevenue",
    header: ({ column }) => { 
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Minium spending
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("boundaryRevenue"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "discount",
    header: ({ column }) => { 
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Discount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customerType = row.original
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Pencil className="size-4 cursor-pointer"/>
          </DialogTrigger>
          <DialogContent >
            <DialogHeader>
              <DialogTitle>Edit Membership #{customerType.customerTypeId}</DialogTitle>
              <DialogDescription>
                Make changes to membership here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 w-[100%]">
              <table className="border-spacing-2 border-separate">
                <tr >
                  <td >Membership</td>
                  <td ><Input defaultValue={customerType.customerTypeName} /></td>
                </tr>
                <tr >
                  <td >Minium spending</td>
                  <td ><Input defaultValue={customerType.boundaryRevenue} /></td>
                </tr>
                <tr>
                  <td >Discount</td>
                  <td ><Input defaultValue={customerType.discount} /></td>
                </tr>
              </table>            
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
