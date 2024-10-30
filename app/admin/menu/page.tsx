"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pizza, Utensils, Coffee, Drumstick, Fish, Cake, Plus, PenSquare, Search, X, Upload } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: React.ElementType
  image: string
}

interface Dish {
  id: string
  categoryId: string
  productName: string
  price: number
  imageUrl: string
}

const initialCategories: Category[] = [
  { id: "all", name: "All", icon: Utensils, image: "/placeholder.svg?height=100&width=100" },
  { id: "bakery", name: "Bakery", icon: Cake, image: "/placeholder.svg?height=100&width=100" },
  { id: "burger", name: "Burger", icon: Utensils, image: "/placeholder.svg?height=100&width=100" },
  { id: "beverage", name: "Beverage", icon: Coffee, image: "/placeholder.svg?height=100&width=100" },
  { id: "chicken", name: "Chicken", icon: Drumstick, image: "/placeholder.svg?height=100&width=100" },
  { id: "pizza", name: "Pizza", icon: Pizza, image: "/placeholder.svg?height=100&width=100" },
  { id: "seafood", name: "Seafood", icon: Fish, image: "/placeholder.svg?height=100&width=100" },
]

const initialDishes: Dish[] = [
  {
    id: "1",
    categoryId: "burger",
    productName: "Classic Cheeseburger",
    price: 5.99,
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    categoryId: "pizza",
    productName: "Margherita Pizza",
    price: 8.99,
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    categoryId: "beverage",
    productName: "Iced Latte",
    price: 3.99,
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    categoryId: "seafood",
    productName: "Grilled Salmon",
    price: 12.99,
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
]

function CategoryButton({ category, isActive, onClick }: { category: Category; isActive: boolean; onClick: () => void }) {
  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className={`flex items-center space-x-2 ${isActive ? 'bg-[#00B074] text-white' : 'text-gray-600 hover:text-[#00B074]'}`}
      onClick={onClick}
    >
      <category.icon className="w-4 h-4" />
      <span>{category.name}</span>
    </Button>
  )
}

function DishCard({ dish, category, onModify }: { dish: Dish; category: Category; onModify: () => void }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <div className="relative h-48">
        <Image
          src={dish.imageUrl}
          alt={dish.productName}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
          <Button size="sm" variant="secondary" className="text-white bg-[#00B074] hover:bg-[#00956A]" onClick={onModify}>
            <PenSquare className="w-4 h-4 mr-2" />
            Modify
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <category.icon className="w-4 h-4 text-[#00B074]" />
          <span className="text-sm text-gray-500">{category.name}</span>
        </div>
        <h3 className="font-semibold text-lg mb-2">{dish.productName}</h3>
        <span className="text-lg font-bold text-[#00B074]">${dish.price.toFixed(2)}</span>
      </CardContent>
    </Card>
  )
}

function ImageUploader({ image, onImageUpload }: { image: string; onImageUpload: (imageUrl: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      onImageUpload(imageUrl)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      onImageUpload(imageUrl)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }
  console.log(image);
  return (
    <div 
      className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      {image && image !== "" ? (
		
        <Image src={image} alt="Selected image" layout="fill" objectFit="contain" />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Upload className="w-8 h-8 mb-2 text-gray-500" />
          <p className="text-sm text-gray-500">Click or drag image</p>
        </div>
      )}
      <Input
        id="dropzone-file"
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  )
}

function CategoryForm({ category, onSubmit, onCancel }: { category?: Category; onSubmit: (category: Partial<Category>) => void; onCancel: () => void }) {
  const [name, setName] = useState(category?.name || "")
  const [image, setImage] = useState(category?.image || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, image })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label>Image</Label>
        <ImageUploader image={image} onImageUpload={setImage} />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}

function DishForm({ dish, categories, onSubmit, onCancel }: { dish?: Dish; categories: Category[]; onSubmit: (dish: Partial<Dish>) => void; onCancel: () => void }) {
  const [productName, setProductName] = useState(dish?.productName || "")
  const [price, setPrice] = useState(dish?.price.toString() || "")
  const [imageUrl, setImageUrl] = useState(dish?.imageUrl || "")
  const [categoryId, setCategoryId] = useState(dish?.categoryId || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ productName, price: parseFloat(price), imageUrl, categoryId })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="productName">Name</Label>
        <Input id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label>Image</Label>
        <ImageUploader image={imageUrl} onImageUpload={setImageUrl} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.filter(c => c.id !== "all").map((category) => (
              <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}

export default function ProductMenu() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [dishes, setDishes] = useState<Dish[]>(initialDishes)
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
  const [isAddDishDialogOpen, setIsAddDishDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingDish, setEditingDish] = useState<Dish | null>(null)

  const filteredDishes = dishes.filter(dish => 
    (activeCategory === "all" || dish.categoryId === activeCategory) &&
    dish.productName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCategory = (newCategory: Partial<Category>) => {
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name!,
      icon: Utensils,
      image: newCategory.image!,
    }
    setCategories([...categories, category])
    setIsAddCategoryDialogOpen(false)
  }

  const handleModifyCategory = (updatedCategory: Partial<Category>) => {
    setCategories(categories.map(c => c.id === editingCategory?.id ? { ...c, ...updatedCategory } : c))
    setEditingCategory(null)
  }

  const handleAddDish = (newDish: Partial<Dish>) => {
    const dish: Dish = {
      id: Date.now().toString(),
      categoryId: newDish.categoryId!,
      productName: newDish.productName!,
      price: newDish.price!,
      imageUrl: newDish.imageUrl!,
    }
    setDishes([...dishes, dish])
    setIsAddDishDialogOpen(false)
  }

  const handleModifyDish = (updatedDish: Partial<Dish>) => {
    setDishes(dishes.map(d => d.id === editingDish?.id ? { ...d, ...updatedDish } : d))
    setEditingDish(null)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Our Menu</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore our wide range of delicious dishes and beverages</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 gap-4">
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {categories.map((category) => (
            <CategoryButton 
              key={category.id} 
              category={category} 
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
          <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <CategoryForm onSubmit={handleAddCategory} onCancel={() => setIsAddCategoryDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search dishes..." 
            className="pl-10 pr-4 py-2 w-full sm:w-64 border-gray-300  focus:ring-[#00B074] focus:border-[#00B074]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm("")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Dialog open={isAddDishDialogOpen} onOpenChange={setIsAddDishDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00B074] hover:bg-[#00956A] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Dish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Dish</DialogTitle>
            </DialogHeader>
            <DishForm categories={categories} onSubmit={handleAddDish} onCancel={() => setIsAddDishDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredDishes.map((dish) => (
          <DishCard 
            key={dish.id} 
            dish={dish} 
            category={categories.find(c => c.id === dish.categoryId)!}
            onModify={() => setEditingDish(dish)}
          />
        ))}
      </div>

      {filteredDishes.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No dishes found</h3>
          <p className="text-gray-500">Try adjusting your search or category filter.</p>
        </div>
      )}

      <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Category</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm 
              category={editingCategory} 
              onSubmit={handleModifyCategory} 
              onCancel={() => setEditingCategory(null)} 
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingDish} onOpenChange={(open) => !open && setEditingDish(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Dish</DialogTitle>
          </DialogHeader>
          {editingDish && (
            <DishForm 
              dish={editingDish} 
              categories={categories} 
              onSubmit={handleModifyDish} 
              onCancel={() => setEditingDish(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}