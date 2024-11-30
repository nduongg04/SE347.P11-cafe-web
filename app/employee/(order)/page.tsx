'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import MenuOrder from './menuOrder'
import { PrdBill } from './menuOrder'
import BillTable from './billOrder'
type Props = {}

export default function OrderPage({}: Props) {
 const [listPrdBill,setListPrdBill]= React.useState<PrdBill[]>([])
  return (
    <div>
      
 <div className='flex overflow-hidden'>
      <div className='basis-3/6'>
       
     <MenuOrder listPrdBill={listPrdBill} setListPrdBill={setListPrdBill} />

      </div>
      <div className='basis-3/6'>
        <BillTable data={listPrdBill} setData={setListPrdBill}></BillTable>
      </div>
    </div>
    </div>
   
  )
}