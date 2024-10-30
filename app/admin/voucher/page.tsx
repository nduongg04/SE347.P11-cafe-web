"use client";

import VoucherForm, { formSchema } from "@/components/admin/VoucherForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Pencil, Plus, Search, TriangleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

export interface Voucher {
  id: number;
  code: string;
  typeName: "Percentage of bill" | "Discount directly on invoice";
  numberOfApplications: number;
  createdAt: Date;
  expiredAt: Date;
}

const initialVouchers: Voucher[] = [
  {
    id: 1,
    code: "SU",
    typeName: "Percentage of bill",
    numberOfApplications: 1000,
    createdAt: new Date("2024-09-10"),
    expiredAt: new Date("2024-10-10"),
  },
  {
    id: 2,
    code: "2",
    typeName: "Percentage of bill",
    numberOfApplications: 1000,
    createdAt: new Date("2024-09-10"),
    expiredAt: new Date("2024-10-10"),
  },
  {
    id: 3,
    code: "3",
    typeName: "Percentage of bill",
    numberOfApplications: 1000,
    createdAt: new Date("2024-09-10"),
    expiredAt: new Date("2024-10-10"),
  },
  {
    id: 4,
    code: "4",
    typeName: "Percentage of bill",
    numberOfApplications: 1000,
    createdAt: new Date("2024-09-10"),
    expiredAt: new Date("2024-10-10"),
  },
  {
    id: 5,
    code: "5",
    typeName: "Percentage of bill",
    numberOfApplications: 1000,
    createdAt: new Date("2024-09-10"),
    expiredAt: new Date("2024-10-10"),
  },
  {
    id: 6,
    code: "6",
    typeName: "Discount directly on invoice",
    numberOfApplications: 1000,
    createdAt: new Date("2024-09-10"),
    expiredAt: new Date("2024-10-10"),
  },
  {
    id: 7,
    code: "VIETNAM",
    typeName: "Discount directly on invoice",
    numberOfApplications: 1000,
    createdAt: new Date("2024-09-10"),
    expiredAt: new Date("2024-10-10"),
  },
  {
    id: 8,
    code: "8",
    typeName: "Discount directly on invoice",
    numberOfApplications: 1000,
    createdAt: new Date("2024-09-10"),
    expiredAt: new Date("2024-10-10"),
  },
  {
    id: 9,
    code: "9",
    typeName: "Discount directly on invoice",
    numberOfApplications: 1000,
    createdAt: new Date("2024-09-10"),
    expiredAt: new Date("2024-10-10"),
  },
];

export default function VoucherManagement() {
  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVouchers, setSelectedVouchers] = useState<number[]>([]);
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editOrAdd, setEditOrAdd] = useState<"edit" | "add">("add");
  const [formMessage, setFormMessage] = useState<string>("");

  const handleAddVoucher = () => {
    setEditingVoucher(null);
    setIsDialogOpen(true);
    setEditOrAdd("add");
    setFormMessage("");
  };

  const handleEditVoucher = (voucher: Voucher) => {
    setEditingVoucher(voucher);
    setIsDialogOpen(true);
    setEditOrAdd("edit");
    setFormMessage("");
  };

  const handleSelectVoucher = (voucherId: number) => {
    setSelectedVouchers((prev) =>
      prev.includes(voucherId)
        ? prev.filter((id) => id !== voucherId)
        : [...prev, voucherId],
    );
  };

  const handleSelectAllVouchers = () => {
    setSelectedVouchers(
      selectedVouchers.length === vouchers.length
        ? []
        : vouchers.map((v) => v.id),
    );
  };

  const handleDeleteSelected = () => {
    setVouchers(vouchers.filter((v) => !selectedVouchers.includes(v.id)));
    setSelectedVouchers([]);
  };

  const handleAddSubmit = async (values: z.infer<typeof formSchema>) => {
    setVouchers([
      ...vouchers,
      {
        id: vouchers.length + 1,
        ...values,
        numberOfApplications: Number(values.numberOfApplications),
      },
    ]);
    console.log(values);
  };

  const handleEditSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    const handleSearch = () => {
      setVouchers(
        initialVouchers.filter((v) =>
          v.code.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    };

    handleSearch();
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Voucher Management</h1>
        <div className="flex items-center justify-end gap-2">
          <div className="relative flex-1 sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Search by code..."
              className="w-full border-gray-300 py-2 pl-10 pr-4 focus:border-[#00B074] focus:ring-[#00B074] sm:w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-[#00B074] text-white hover:bg-[#00956A]"
                onClick={handleAddVoucher}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Voucher
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Voucher detail</DialogTitle>
              </DialogHeader>
              <VoucherForm
                setIsDialogOpen={setIsDialogOpen}
                editingVoucher={editingVoucher && editingVoucher}
                editOrAdd={editOrAdd}
                handleSubmit={
                  editOrAdd === "add" ? handleAddSubmit : handleEditSubmit
                }
                formMessage={formMessage}
              />
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                onClick={handleDeleteSelected}
                variant="destructive"
                disabled={selectedVouchers.length === 0}
              >
                Delete vouchers
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
                  onClick={handleDeleteSelected}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Table className="rounded-lg bg-white">
        <TableHeader className="">
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Type name</TableHead>
            <TableHead>Number of applications</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Expired at</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedVouchers.length === vouchers.length}
                onCheckedChange={handleSelectAllVouchers}
                aria-label="Select all"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vouchers.map((voucher, index) => (
            <TableRow key={voucher.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{voucher.code}</TableCell>
              <TableCell>{voucher.typeName}</TableCell>
              <TableCell>{voucher.numberOfApplications}</TableCell>
              <TableCell>{format(voucher.createdAt, "dd/MM/yyyy")}</TableCell>
              <TableCell>{format(voucher.expiredAt, "dd/MM/yyyy")}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditVoucher(voucher)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={selectedVouchers.includes(voucher.id)}
                  onCheckedChange={() => handleSelectVoucher(voucher.id)}
                  aria-label={`Select voucher ${voucher.code}`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
