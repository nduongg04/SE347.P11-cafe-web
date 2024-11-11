"use client";

import CategoryButton from "@/components/admin/CategoryButton";
import DishCardMenu from "@/components/admin/DishCardMenu";
import DishForm, { dishFormSchema } from "@/components/admin/DishForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { initialCategories } from "@/constants";
import { toast } from "@/hooks/use-toast";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "@/lib/actions/menu.action";
import { uploadImage } from "@/lib/actions/upload.action";
import { Loader2, Plus, Search, Tally3, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";

export default function ProductMenu() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDishDialogOpen, setIsAddDishDialogOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const categories = initialCategories;

  const queryClient = useQueryClient();

  const { data: dishes = [] as Dish[], isLoading: isFetching } = useQuery<
    Dish[]
  >({
    queryKey: ["dishes"],
    queryFn: async () => {
      const dishes = await getAllProduct();
      if (!dishes) {
        toast({
          title: "Failed to fetch dishes",
          description: "Please try again",
          variant: "destructive",
        });
        return [];
      }
      return dishes;
    },
  });

  const filteredDishes = useMemo(() => {
    return dishes.filter(
      (d) =>
        (activeCategory === "all" || d.categoryName === activeCategory) &&
        d.productName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [debouncedSearchTerm, dishes]);

  const addMutation = useMutation({
    mutationFn: async (newDish: z.infer<typeof dishFormSchema>) => {
      setIsLoading(true);
      if (newDish.image instanceof File) {
        const formData = new FormData();
        formData.append("file", newDish.image);
        const uploadImageUrl = (await uploadImage(formData))?.imageUrl;
        if (!uploadImageUrl) {
          throw new Error("Failed to upload image");
        }
        const dish = (
          await addProduct({
            ...newDish,
            image: uploadImageUrl,
          })
        )?.data;
        if (!dish) {
          throw new Error("Failed to add dish");
        }
        setIsAddDishDialogOpen(false);
        setIsLoading(false);
        return dish;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dishes"] });
      toast({
        title: "Success",
        description: "Dish added successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add dish",
        variant: "destructive",
      });
    },
  });

  const modifyMutation = useMutation({
    mutationFn: async (updatedDish: z.infer<typeof dishFormSchema>) => {
      setIsLoading(true);
      console.log(updatedDish);
      if (!editingDish) throw new Error("No dish selected for editing");

      let imageUrl = editingDish.image;

      if (updatedDish.image && updatedDish.image instanceof File) {
        try {
          const formData = new FormData();
          formData.append("file", updatedDish.image);
          const uploadData = await uploadImage(formData);

          if (!uploadData?.imageUrl) {
            throw new Error("Failed to upload image");
          }
          console.log(uploadData);
          imageUrl = uploadData.imageUrl;
        } catch (error) {
          setIsLoading(false);
          throw new Error("Image upload failed");
        }
      }

      try {
        const dish = await updateProduct({
          ...updatedDish,
          productID: editingDish.productID,
          image: imageUrl,
        });

        if (!dish?.data) {
          throw new Error("Failed to modify dish");
        }

        setIsLoading(false);
        setEditingDish(null);
        console.log(dish.data);
        return dish.data;
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dishes"] });
      toast({
        title: "Success",
        description: "Dish modified successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to modify dish",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (productID: number) => {
      const message = await deleteProduct(productID);
      if (!message) {
        throw new Error("Failed to delete dish");
      }
      return message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dishes"] });
      toast({
        title: "Success",
        description: "Dish deleted successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete dish",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Our Menu</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          Explore our wide range of delicious dishes and beverages
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
          <CategoryButton
            category={{ categoryID: 0, categoryName: "All", icon: Tally3 }}
            isActive={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {categories.map((category) => (
            <CategoryButton
              key={category.categoryID}
              category={category}
              isActive={activeCategory === category.categoryName}
              onClick={() => setActiveCategory(category.categoryName)}
            />
          ))}
        </div>
        <div className="relative flex-1 sm:w-auto">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Search dishes..."
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
        <Dialog
          open={isAddDishDialogOpen}
          onOpenChange={setIsAddDishDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="bg-[#00B074] text-white hover:bg-[#00956A]">
              <Plus className="mr-2 h-4 w-4" />
              Add New Dish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Dish</DialogTitle>
            </DialogHeader>
            <DishForm
              isLoading={isLoading}
              categories={categories}
              onSubmit={addMutation.mutate}
              onCancel={() => setIsAddDishDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDishes.map((dish) => (
          <DishCardMenu
            key={dish.productID}
            dish={dish}
            onModify={() => setEditingDish(dish)}
            onDelete={() => deleteMutation.mutate(dish.productID)}
          />
        ))}
      </div>
      {isFetching ? (
        <div className="flex justify-center items-center">
				<svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
						<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
				</svg>
		</div>
      ) : filteredDishes.length === 0 ? (
        <div className="py-12 text-center">
          <h3 className="mb-2 text-2xl font-semibold text-gray-700">
            No dishes found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or category filter.
          </p>
        </div>
      ) : null}

      <Dialog
        open={!!editingDish}
        onOpenChange={(open) => !open && setEditingDish(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Dish</DialogTitle>
          </DialogHeader>
          {editingDish && (
            <DishForm
              isLoading={isLoading}
              dish={editingDish}
              categories={categories}
              onSubmit={modifyMutation.mutate}
              onCancel={() => setEditingDish(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
