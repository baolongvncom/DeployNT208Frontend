import React from 'react'

const ProductSizeSelector = () => {
  return (
    <div className="flex flex-col justify-center pt-2 pb-px mt-5 text-base leading-7 bg-black bg-opacity-0 max-md:max-w-full">
    <div className="font-bold text-gray-700 max-md:max-w-full">Choose size</div>
    <div className="flex gap-5 justify-center px-4 py-3.5 mt-2 bg-gray-100 rounded text-zinc-900 max-md:flex-wrap max-md:max-w-full">
      <div className="my-auto">50.00 ML</div>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7105b667d36b1b3c29b325a4df905e343dd8034066f7c2c345c8cd680501b8d5?apiKey=50bc5984540a45a8bc42c6af2a45e528&" alt="" className="shrink-0 w-4 aspect-square" />
    </div>
  </div>
  )
}

export default ProductSizeSelector
