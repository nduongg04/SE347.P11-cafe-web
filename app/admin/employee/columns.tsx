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

export type Staff = {
  appUserId: string
  staffName: string
  userName: string
  isAdmin: boolean
  password: string
}

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "appUserId",
    header: "ID",
  },
  {
    accessorKey: "staffName",
    header: "Full name"
  },
  {
    accessorKey: "userName",
    header: "Account"
  },
  {
    accessorKey: "isAdmin",
    header: "Role",
    cell: ({ row }) => {
      return row.getValue("isAdmin")==true? <Label className="text-red-500">Admin</Label> : <Label className="text-green-500">Staff</Label>
    }
  },
  {
    id: "actions",
      cell: ({ row }) => {
        const staff = row.original
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Pencil className="size-4 cursor-pointer"/>
            </DialogTrigger>
            <DialogContent >
              <DialogHeader>
                <DialogTitle>Edit staff #{staff.appUserId}</DialogTitle>
                <DialogDescription>
                  Make changes to staff here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 w-[100%]">
                <table className="border-spacing-2 border-separate">
                  <tr >
                    <td >Full name</td>
                    <td ><Input defaultValue={staff.staffName} /></td>
                  </tr>
                  <tr >
                    <td >Account</td>
                    <td ><Input defaultValue={staff.userName} /></td>
                  </tr>
                  <tr>
                    <td >Password</td>
                    <td ><Input type="password" defaultValue={staff.password} /></td>
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
