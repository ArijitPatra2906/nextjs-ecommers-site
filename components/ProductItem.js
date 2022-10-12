import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProductItem({ product, cartHandler }) {
    return (
        <div className='card'>
            <Link href={`/product/${product.slug}`}>
                <a>
                    {/* <img src={product.image} alt={product.name} className="rounded shadow" /> */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                    ></Image>
                </a>
            </Link>
            <div className='flex flex-col items-center justify-center p-5'>
                <Link href={`/product/${product.slug}`}>
                    <a>
                        <h2 className='text-lg'>
                            {product.name}
                        </h2>
                    </a>
                </Link>
                <p className='mb-2'>{product.brand}</p>
                <p>₹{product.price}</p>
                <button className='primary-button hover:bg-amber-400 active:bg-amber-500' onClick={() => cartHandler(product)}>Add to cart</button>
            </div>
        </div>
    )
}
