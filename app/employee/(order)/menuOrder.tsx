'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Type } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { getProductData, getCategoryData } from './fetchingData'

import { ScrollArea } from '@/components/ui/scroll-area'
import Loading from 'react-loading'

export type Product = {
    ProductId: number,
    ProductName: string,
    Price: number,
    Image: string,
    IsSoldOut: boolean,
    CategoryName: string
}
export type Category = {
    CategoryID: number,
    CategoryName: string
}
export type PrdBill = {
    ProductId: number,
    ProductName: string,
    Price: number,
    Quantity: number,
    Total: number,
}
type Props = {
    listPrdBill: PrdBill[]
    setListPrdBill: React.Dispatch<React.SetStateAction<PrdBill[]>>
}
export default function MenuOrder({ listPrdBill, setListPrdBill }: Props) {
    const [searchPrd, setSearchPrd] = React.useState('');
    const [categories, setCategories] = React.useState<Category[]>([])
    const [products, setProducts] = React.useState<Product[]>([])
    const [open, setOpen] = React.useState(false)
    const [typeCate, setTypeCate] = React.useState("")
    const [listPrd, setListPrd] = React.useState<Product[]>(products)
    const [loading,setLoading]= useState(false)
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const categories = await getCategoryData();
            const products = await getProductData();
            setCategories(categories);
            setProducts(products);
            setListPrd(products);
            setLoading(false)
        }
        fetchData();
    }, [])
    const formatted = (amount: number) => new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
    }).format(amount)
    const clickPrd = (prd: Product) => {

        if (prd.IsSoldOut) {
            return;
        }
        const updatedList = [...listPrdBill];
        let check = false;
        for (let i = 0; i < updatedList.length; i++) {
            if (updatedList[i].ProductId == prd.ProductId) {
                console.log('click')
                updatedList[i] = {
                    ...updatedList[i],
                    Quantity: updatedList[i].Quantity + 1,
                    Total: prd.Price * (updatedList[i].Quantity + 1),
                };
                setListPrdBill(updatedList)
                check = true;
                break;
            }
        }
        if (!check) {

            updatedList.push({
                ProductId: prd.ProductId,
                ProductName: prd.ProductName,
                Price: prd.Price,
                Quantity: 1,
                Total: prd.Price,
            })
            setListPrdBill(updatedList)

        }
    }
    const handleSearchPrd = (name: string) => {
        setSearchPrd(name)
        if (name == "" || !name) {
            setListPrd(products);
            return;
        } else {
            const filteredProducts = products.filter((prd) =>
                prd.ProductName.toLowerCase().includes(name.toLowerCase()) // Tìm kiếm không phân biệt chữ hoa chữ thường
            );
            setListPrd(filteredProducts); // Cập nhật danh sách với sản phẩm đã lọc
        }

    }
    const handleChooseCategory = (id: string) => {
        if (!id || id === "" || id === 'All') {
            setListPrd(products);
            return;
        } else {
            const filteredProducts = products.filter((prd) =>
                String(prd.CategoryName) == id
            );
            setListPrd(filteredProducts); // Cập nhật danh sách với sản phẩm đã lọc
        }
    }

    return (
        <div className='bg-white px-2 py-2 mr-2 h-[98%] mt-2 rounded-lg shadow-sm'>
            <div className='flex justify-between px-3 mt-2'>
                <Input
                    placeholder="Search by name"
                    value={searchPrd}
                    onChange={(a) => handleSearchPrd(a.target.value)}
                    className="max-w-xs bg-white rounded-md " />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[180px] justify-between"
                        >
                            {typeCate
                                ? categories.find((category) => String(category.CategoryName) === typeCate)?.CategoryName
                                : "All"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandList>
                                <CommandEmpty>No category found.</CommandEmpty>
                                <CommandGroup>
                                    {categories.map((category) => (
                                        <CommandItem
                                            key={category.CategoryName}
                                            value={String(category.CategoryName)}
                                            onSelect={(currentValue) => {
                                                if (currentValue === typeCate) {
                                                    handleChooseCategory("All")
                                                }
                                                else {
                                                    handleChooseCategory(currentValue)
                                                }
                                                setTypeCate(currentValue === typeCate ? "" : currentValue)
                                                setOpen(false)


                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    typeCate === String(category.CategoryName) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {category.CategoryName}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            {loading?
            <div className='flex justify-center items-center h-[660px]'>
            <Loading
             type="spin"
             color="gray"
             height={30}
             width={30}
             className="ml-5"
           />
            </div>
            :
            <ScrollArea className="mt-3 h-[645px] pb-1">
                <div className="grid grid-cols-3 grid-rows-3 gap-4 px-4 py-2 h-full">
                    {listPrd.map((prd) => (
                        prd.IsSoldOut ?
                            (<div
                                key={prd.ProductId}
                                className="border rounded-lg p-3 px-1 text-center shadow-md flex flex-col justify-between relative"
                            >
                                <div className="absolute inset-0 border rounded-lg bg-gray-500 bg-opacity-70 flex items-center justify-center">
                                    <span className=" text-lg font-semibold text-red-600">Sold out</span>
                                </div>
                                <img src={prd.Image} alt="Product Image" className="mb-2 w-full h-32 object-contain rounded-md" />
                                <div>
                                    <h2 className="text-sm font-semibold h-9 flex items-center justify-center text-ellipsis overflow-y-hidden">{prd.ProductName}</h2>
                                    <p className="text-gray-700">{formatted(prd.Price)}</p>
                                </div>
                            </div>)
                            :
                            (<div
                                key={prd.ProductId}
                                className="border rounded-lg p-3 px-1 text-center shadow-md flex flex-col justify-between cursor-pointer hover:bg-gray-100 active:scale-95 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={() => clickPrd(prd)}
                            >
                                <img src={prd.Image} alt="Product Image" className="mb-2 w-full h-32 object-contain rounded-md" />
                                <div>
                                    <h2 className="text-sm font-semibold h-9 flex items-center justify-center text-ellipsis overflow-y-hidden">{prd.ProductName}</h2>
                                    <p className="text-gray-700">{formatted(prd.Price)}</p>
                                </div>
                            </div>)
                    ))}
                </div>
            </ScrollArea>
}
           

        </div>
    )
}