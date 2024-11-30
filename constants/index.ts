import { CakeSlice, Shapes, Coffee } from "lucide-react";

export const staff = {
    staffName: "John Doe",
    username: "johndoe",
    isAdmin: true,
    avatar: "https://github.com/shadcn.png",
};

export const initialCategories: Category[] = [
  { categoryID: 1, categoryName: "Food", icon: CakeSlice },
  { categoryID: 2, categoryName: "Drink", icon: Coffee },
  { categoryID: 3, categoryName: "Other", icon: Shapes },
];

