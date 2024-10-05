"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Bill = {
  id: string
  customerId: string
  voucherId: string
  staffId: string
  payTypeId: string
  status: "waiting" | "paid" 
  totalPrice: number
  createdAt: Date
}

export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At"
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price"
  },
  {
    accessorKey: "status",
    header: "Status"
  }
]
