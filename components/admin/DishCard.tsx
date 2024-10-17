import React from "react";

export const DishCard = () => {
  return (
    <div> 
    	<div className='w-[400px] bg-neutral-50 rounded-lg shadow-lg p-6'>
    	  <div className='mb-4'>
    	    <img 
    	      className='w-full h-[200px] object-cover rounded-md' 
    	      src='https://tools-api.webcrumbs.org/image-placeholder/400/200/food/1' 
    	      alt='Dish Image' 
    	    />
    	  </div>
    	
    	  <h2 className='text-2xl font-title text-primary mb-2'>Delicious Dish Name</h2>
    	  
    	  <div className='flex items-center gap-2 mb-2'>
    	    <img 
    	      className='w-[24px] h-[24px] object-cover rounded-full' 
    	      src='https://tools-api.webcrumbs.org/image-placeholder/24/24/food/2' 
    	      alt='Category Image' 
    	    />
    	    <p className='text-neutral-700'><strong>Category:</strong> Gourmet</p>
    	  </div>
    	
    	  <p className='text-neutral-700 mb-4'>
    	    A brief description of the dish, highlighting its key ingredients or flavors.
    	  </p>
    	
    	  <div className='flex justify-between items-center'>
    	    <span className='text-lg font-semibold text-primary'>$12.99</span>
    	
    	    <button className='bg-primary text-neutral-50 font-bold px-4 py-2 rounded-md'>
    	      Order Now
    	    </button>
    	  </div>
    	</div> 
    </div>
  )
}

