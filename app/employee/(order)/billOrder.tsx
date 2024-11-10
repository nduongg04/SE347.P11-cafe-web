import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { PrdBill } from "./menuOrder"
import { Button} from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import React from 'react'
import { Trash2,Plus,Minus,SearchCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
    data:PrdBill[],
    setData:React.Dispatch<React.SetStateAction<PrdBill[]>>
}
export type Customer={
  customerID:number,
  customerName:string,
  phoneNumber:string,
  email:string,
  customerType:string
}

export default function BillTable({data,setData}: Props) {
    
    React.useEffect(()=>{
        console.log(data)
    },[data])
    
    const handleDelete=(id:number)=>{
        setData((prevList) =>
            prevList.filter((item) => item.ProductId !== id)
          );
    }
    const handleSubtract=(index:number)=>{
        const updateList =[...data];
        if(updateList[index].Quantity>1)
        {
             updateList[index].Quantity=updateList[index].Quantity-1;
        setData(updateList)
        }
       
    }
    const handleAdd=(index:number)=>{
        const updateList =[...data];
        updateList[index].Quantity=updateList[index].Quantity+1;
        setData(updateList)
    }
    const handleQuantityChange=(index:number, quantity:number)=>{
        const updateList =[...data];
        if(quantity<1)
        {
            quantity=1
        }
        setData((prevList) =>
            prevList.map((item, idx) =>
              idx === index
                ? { ...item, Quantity: quantity, Total: quantity * item.Price }
                : item
            ))
    }
    
    const columns: ColumnDef<PrdBill>[] = [
        {
            id:'action',
            cell:({row})=>{
                return(
                    <div>
                        <Button
                    variant='ghost'
                    onClick={()=>handleDelete(row.original.ProductId)}
                    className="p-1 ml-2 mr-0">
                        <Trash2/>
                    </Button>
                   
                    </div>
                    
                )
            }
        },
        {
            header: 'STT',
            accessorFn: (_, index) => index + 1, // Tự động đánh số thứ tự
            cell: ({ getValue }) => <>{getValue()}</>, // Hiển thị số thứ tự
        },
        {
            header:'Tên món',
            accessorKey:'ProductName',
            cell:({row})=>{
                return(
                    <p className="w-40">{row.getValue('ProductName')}</p>
                )
            }
        },
        {
            header:'Số lượng',
            accessorKey:'Quantity',
            cell:({row})=>{
                return(
                    <div className="flex">
                        {/* <Button
                        variant='ghost'
                        onClick={()=>handleSubtract(row.index)}>
                            <Minus/>
                        </Button> */}
                        <Input 
                    type="number"
                    min={1}
                    value={row.getValue('Quantity')}
                    onChange={(e)=>handleQuantityChange(row.index,Number(e.target.value))}
                    className='w-16'
                    />
                    {/* <Button 
                    variant='ghost'
                    onClick={()=>handleAdd(row.index)}>
                    <Plus/>
                    </Button> */}
                    </div>
                )
            }
        },
        {
            header:'Đơn giá',
            accessorKey:'Price'
        },
        {
            header:'Thành tiền',
            accessorKey:'Total'
        }
       
    ]
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        
      });
  return (
    <div className="bg-white h ml-2 px-3 pt-3 my-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex items-center">
          <h2>Khách hàng :</h2>
          <Input className="w-32 ml-3 h-8"/>
          <Button variant='ghost'
          className="p-1 ml-2">
          <SearchCheck/>
          </Button>
          
        </div>
        <div className="flex items-center">
          <h2>Voucher :</h2>
          <Input className="w-32 ml-3 h-8"/>
          <Button variant='ghost'
          className="p-1 ml-2">
          <SearchCheck/>
          </Button>
          
        </div>
      </div>
      <ScrollArea className=" h-[500px] border-2 border-gray-400  rounded-md mt-4 pb-1">
      <div className=" h-full">
         
         <Table >
        <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
   
       
    </div>
      </ScrollArea>
      <div>
                <div>
                    <h2>Tổng :</h2>
                </div>
                <div>
                    <h2>Thành viên bạc : </h2>
                </div>
                <div>
                    <h2>Voucher -10% :</h2>
                </div>
                <div>
                    <h2>Thành tiền :</h2>
                </div>
      </div>
      <div className="gap-2 flex justify-end mr-3">
        <Button className="bg-red-500 hover:bg-red-300 active:scale-95 active:shadow-lg transition duration-150 ease-in-out" >
          Kết thúc
        </Button>
        <Button className="bg-blue-400 hover:bg-blue-300 active:scale-95 active:shadow-lg transition duration-150 ease-in-out">
            Chuyển khoản
          </Button>
          <Button className="bg-green-500 hover:bg-green-400 active:scale-95 active:shadow-lg transition duration-150 ease-in-out">
          Tiền mặt
          </Button>
      </div>
       
        
    </div>
  )
}
