import React from 'react'

export type ComponentHeaderProps = {
	title: string;
	description: string;
}

const ComponentHeader = ({
	title,
	description,
}: ComponentHeaderProps) => {
  return (
	<div className='flex flex-col '>
		<h1 className="font-semibold text-lg">{title}</h1>
		<p className="text-sm text-gray-500">{description}</p>
	</div>
  )
}

export default ComponentHeader