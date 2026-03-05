

const ProductCard = ({ product }) => {

    return (
        <div className='border p-2 border-[#eee] rounded-2xl mb-2 lg:mb-0'>
            <div className='w-full'>
                <img src={product.image} className='w-full h-30 sm:h-40 md:h-60 object-contain ' />
            </div>
            <div className='flex flex-col p-4'>
                <span className='text-sm text-black'>{(product.title).slice(0, 20) + "..."}</span>
                <span className='text-sm text-black font-bold pt-1'>₹{product.price}</span>
            </div>
        </div>
    )
}

export default ProductCard