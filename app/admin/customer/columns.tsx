"use client";
import * as React from "react";
import {url, token} from '@/constants';
import {toast} from "sonner";
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
  customerType: string
  customerName: string
  phoneNumber: string
  email: string
  revenue: number
}

export const columns:(
  onUpdate:(
    customerId: string,
    customerName: string,
    phoneNumber: string,
    email: string
  ) => void) => ColumnDef<Customer>[] =(onUpdate) => [
  {
    accessorKey: "customerId",
    header: "ID",
  },
  {
    accessorKey: "customerName",
    header: "Full name"
  },
  {
    accessorKey: "email",
    header: "Email"
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
    accessorKey: "customerType",
    header: "Membership" 
  },
  {
    id: "actions",
      cell: ({ row }) => {
        const [customerName, setCustomerName] = React.useState(row.original.customerName);
        const [phoneNumber, setPhoneNumber] = React.useState(row.original.phoneNumber);
        const [email, setEmail] = React.useState(row.original.email);
        const customer = row.original
        const handleSave = async () => {
          if (customerName == customer.customerName && phoneNumber == customer.phoneNumber&& email == customer.email){
            toast.error("No changes detected")
            return
          }
          // Validate phone number
          const phoneRegex = /^0\d{9}$/;
          if (!phoneRegex.test(phoneNumber)) {
            toast.error('Phone number must be 10 digits and start with 0');
            return;
          }
          // Validate email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            toast.error('Invalid email address');
            return;
          }
          try{
            const response = await fetch(`${url}/customer/update/${customer.customerId}`, {
              method: "PUT",
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({customerName: customerName, phoneNumber: phoneNumber, email: email}),
            });
            console.log(response)
            const data = await response.json()
            if (!response.ok) {
              toast.error("Failed to save changes: " + data.message)
              return
            }
          }catch(e){
            toast.error("Failed to save changes: "+ e)
            return;
          }

          toast.success("Changes saved")
          onUpdate(customer.customerId, customerName, phoneNumber, email)
        }
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
                    <td ><Input defaultValue={customer.customerName} value={customerName} onChange={(e)=>setCustomerName(e.target.value)} /></td>
                  </tr>
                  <tr >
                    <td >Phone Number</td>
                    <td ><Input defaultValue={customer.phoneNumber} value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/></td>
                  </tr>
                  <tr >
                    <td >Email</td>
                    <td ><Input type='email' defaultValue={customer.email} value={email} onChange={(e)=>setEmail(e.target.value)}/></td>
                  ,</tr>
                  <tr>
                    <td >Membership</td>
                    <td ><Input defaultValue={customer.customerType} disabled={true} /></td>
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
                <Button type="submit" className="bg-green-600 hover:bg-green-500" onClick={handleSave}>Save changes</Button>
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
  discountValue: number
}
export const customerTypeColumns: (
  onUpdate:(
    customerTypeId: string,
    customerTypeName: string,
    boundaryRevenue: number,
    discountValue: number
  )=> void) => ColumnDef<CustomerType>[] = (onUpdate) => [
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
    accessorKey: "discountValue",
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
      const [customerTypeName, setCustomerTypeName] = React.useState(row.original.customerTypeName);
      const [boundaryRevenue, setBoundaryRevenue] = React.useState(row.original.boundaryRevenue);
      const [discountValue, setDiscountValue] = React.useState(row.original.discountValue);
      const handleSave = async () => {
        if (customerTypeName == row.original.customerTypeName && boundaryRevenue == row.original.boundaryRevenue && discountValue == row.original.discountValue){
          toast.error("No changes detected")
          return
        }
        if(boundaryRevenue < 0){
          toast.error('Minium spending must be greater than 0');
          return;
        }
        if(discountValue < 0 || discountValue > 100){
          toast.error('Discount must be greater than 0 and less than 100');
          return;
        }
        try{
          const response = await fetch(`${url}/customertype/update/${row.original.customerTypeId}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerTypeName: customerTypeName,
              boundaryRevenue: boundaryRevenue,
              discountValue: discountValue
            }),
          })
          const data = await response.json()
          if (!response.ok) {
            toast.error("Failed to save changes: " + data.message)
            return
          }
        }catch(e){
          toast.error("Failed to save changes: ")
        }

        toast.success("Changes saved")
        onUpdate(row.original.customerTypeId, customerTypeName, boundaryRevenue, discountValue)
      }
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
                  <td >
                    <Input 
                      defaultValue={customerType.customerTypeName} 
                      value={customerTypeName} 
                      onChange={(e)=>setCustomerTypeName(e.target.value)}/>
                  </td>
                </tr>
                <tr >
                  <td >Minium spending</td>
                  <td >
                    <Input 
                      type="number"
                      defaultValue={customerType.boundaryRevenue} 
                      value={boundaryRevenue}
                      onChange={(e)=>setBoundaryRevenue(!Number.parseInt(e.target.value)?0:Number.parseInt(e.target.value))}/>
                  </td>
                </tr>
                <tr>
                  <td >Discount</td>
                  <td >
                    <Input 
                      type="number"
                      defaultValue={customerType.discountValue}
                      value={discountValue}
                      onChange={(e)=>setDiscountValue(!Number.parseInt(e.target.value)?0:Number.parseInt(e.target.value))}/>
                  </td>
                </tr>
              </table>            
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-green-600 hover:bg-green-500" onClick={handleSave}>Save changes</Button>
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
