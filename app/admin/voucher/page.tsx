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
import { toast, useToast } from "@/hooks/use-toast";
import {
  createVoucher,
  deleteVouchers,
  getAllVouchers,
  updateVoucher,
} from "@/lib/actions/voucher.action";
import { authenticatedFetch } from "@/lib/auth";
import { format, set } from "date-fns";
import { Pencil, Plus, Search, TriangleAlert, X } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import Loader from "@/components/admin/Loader";

function adjustToLocalDate(date: Date): Date {
  const localDate = new Date(date);
  localDate.setHours(0, 0, 0, 0);
  const timezoneOffset = localDate.getTimezoneOffset() * 60000; // convert to milliseconds
  return new Date(localDate.getTime() - timezoneOffset);
}

export default function VoucherManagement() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVouchers, setSelectedVouchers] = useState<number[]>([]);
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editOrAdd, setEditOrAdd] = useState<"edit" | "add">("add");
  const [formMessage, setFormMessage] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: vouchers = [] as Voucher[], isLoading: isLoadingVouchers } =
    useQuery({
      queryKey: ["vouchers"],
      queryFn: async () => {
        const vouchers = await getAllVouchers();
        if (!vouchers) {
          toast({
            title: "Failed to fetch vouchers",
            description: "Please try again",
            variant: "destructive",
          });
          return [] as Voucher[];
        }
        return vouchers;
      },
    });

  const createMutation = useMutation({
    mutationFn: createVoucher,
    onSuccess: (newVoucher) => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      toast({
        title: "Success",
        description: "Voucher added successfully",
        variant: "success",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add voucher",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateVoucher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      toast({
        title: "Success",
        description: "Voucher updated successfully",
        variant: "success",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update voucher",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVouchers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      setSelectedVouchers([]);
      toast({
        title: "Success",
        description: "Vouchers deleted successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete vouchers",
        variant: "destructive",
      });
    },
  });

  const filteredVouchers = useMemo(() => {
    if (!debouncedSearchTerm) return vouchers;
    return vouchers.filter((v) =>
      v.code.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [debouncedSearchTerm, vouchers]);

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

  const handleAddSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedValues = {
      ...values,
      numberOfApplications: Number(values.numberOfApplications),
      value: Number(values.value),
      createdAt: adjustToLocalDate(values.createdAt),
      expiredAt: adjustToLocalDate(values.expiredAt),
    };
    createMutation.mutate(updatedValues);
  };

  const handleEditSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedValues = {
      ...values,
      id: editingVoucher!.id,
      value: Number(values.value),
      numberOfApplications: Number(values.numberOfApplications),
      createdAt: adjustToLocalDate(values.createdAt),
      expiredAt: adjustToLocalDate(values.expiredAt),
    };
    updateMutation.mutate(updatedValues);
  };

  const handleDeleteConfirm = () => {
    deleteMutation.mutate(selectedVouchers);
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

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
              className="w-64 border-gray-300 py-2 pl-10 pr-4 focus:border-[#00B074] focus:ring-[#00B074] lg:w-full"
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
            <DialogContent
              className="pointer-events-auto"
              onClick={(e) => isLoading && e.stopPropagation()}
            >
              <DialogHeader>
                <DialogTitle>Voucher detail</DialogTitle>
              </DialogHeader>
              <VoucherForm
                isLoading={isLoading}
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
                variant="destructive"
                disabled={selectedVouchers.length === 0}
              >
                {isLoading ? "Deleting..." : "Delete vouchers"}
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
                  onClick={handleDeleteConfirm}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {isLoadingVouchers ? (
        <Loader />
      ) : (
        <Table className="rounded-lg bg-white">
          <TableHeader className="">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Type name</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Number of applications</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Expired at</TableHead>
              <TableHead className="text-right">Actions</TableHead>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedVouchers.length !== 0 &&
                    selectedVouchers.length === vouchers.length
                  }
                  onCheckedChange={handleSelectAllVouchers}
                  aria-label="Select all"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVouchers.map((voucher, index) => (
              <TableRow key={voucher.id}>
                <TableCell>{voucher.id}</TableCell>
                <TableCell>{voucher.code}</TableCell>
                <TableCell>{voucher.typeName}</TableCell>
                <TableCell>
                  {voucher.typeName === "Percentage of bill"
                    ? `${voucher.value}%`
                    : `${voucher.value.toLocaleString("vi-VN")} VNĐ`}
                </TableCell>
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
      )}
    </div>
  );
}
