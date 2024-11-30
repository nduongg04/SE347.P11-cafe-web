"use client";

import { PenSquare, Trash2, Utensils } from "lucide-react";
import { Button } from "../ui/button";

export default function CategoryButton({
  category,
  isActive,
  onClick,
}: {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}) {
	try {
		
	} catch (error) {
		
	}
  return (
    <div className="group relative">
      <Button
        variant={isActive ? "default" : "ghost"}
        className={`flex hover:bg-transparent items-center space-x-2 ${isActive ? "bg-[#00B074] text-white hover:bg-[#00B074]/80" : "text-gray-600 hover:text-[#00B074]"}`}
        onClick={onClick}
      >
        <category.icon className="h-4 w-4" />
        <span>{category.categoryName}</span>
      </Button>
    </div>
  );
}
